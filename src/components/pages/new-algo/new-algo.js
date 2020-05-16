import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import './new-algo.css'
import PageTitle from "../../page-title";
import {Container, Form, Row} from "react-bootstrap";
import RowLine from "../../code-ide/editor/row";
import {isBlockOperation, isEndBlockOperation} from "../../code-ide/operation";
import OperationConstructor from "../../code-ide/operation-constructor";
import Button from "../../gui/button";
import GroupButton from "../../gui/button-group";
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';


const funcs = [
    {
        name: 'set_item_by_index',
        paramsCount: 3,
        description: ''
    }, {
        name: 'get_item_by_index',
        paramsCount: 2,
        description: ''
    }
];


class NewAlgoPage extends Component {
    constructor(props) {
        super(props)
        const {algoBridgeService} = this.props;
        this.algoBridgeService = algoBridgeService;
        this.titleRef = React.createRef();
        this.descriptionRef = React.createRef();

        this.state = {
            mode: 'normal',
            error: '',
            output: '',
            operations: [{type: 'empty', parameter: {}}],
            selectedRow: -1,
        };
    }

    handleSaveRowOperation = (newOperation) => {
        const updatedOperations = [
            ...this.state.operations.slice(0, this.state.selectedRow),
            newOperation,
            ...this.state.operations.slice(this.state.selectedRow + 1)
        ];
        this.setState(
            {
                'operations': updatedOperations,
                'selectedRow': -1,
            }
        );
    };

    handleSelectRow = (index) => {
       this.setState({'selectedRow': index});
    };

    handleUnselectRow = () => {
        this.setState({'selectedRow': -1});
    };

    handleAddRow = (index) => {
        const emptyOperation = {type: 'empty', parameter: {}};
        const updatedOperations = [
            ...this.state.operations.slice(0, index+1),
            emptyOperation,
            ...this.state.operations.slice(index+1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    };

    handleRemoveRow = (index) => {
        if (this.state.operations.length === 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleMoveRowUp = (index) => {
        if (index === 0)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index-1),
            this.state.operations[index],
            this.state.operations[index-1],
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleMoveRowDown = (index) => {
        if (index === this.state.operations.length - 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            this.state.operations[index+1],
            this.state.operations[index],
            ...this.state.operations.slice(index + 2)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleRunImplementation = (event) => {
        this.algoBridgeService.runImplementation(JSON.stringify(this.state.operations))
        .then((result) => {
            if (Array.isArray(result)) {
                let vars = result;
                let wileVars = "";
                vars.forEach((item) => {
                    wileVars += JSON.stringify(item) + '\n';
                });
                this.setState({
                    output: wileVars,
                    error: ""
                });
            } else {
                this.setState({
                    error: result['error'],
                    output: ""
                });
            }
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    handleCreateAlgo = () => {
        let title = this.titleRef.current.value;
        let description = this.descriptionRef.current.value;
        let operations = JSON.stringify(this.state.operations);

        const {history} = this.props;
        this.algoBridgeService.createAlgo(title, description, operations)
        .then((result) => {
            if (result.status === 201) {
                let algoId = result.algo_id;
                history.push(`/algo/${algoId}/show`);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    handleChangeRowOperationFromDrag = (newOperation, indexFrom, indexTo) => {
        let updatedOperations = [
            ...this.state.operations.slice(0, indexFrom),
            {type: 'empty', parameter: {}},
            ...this.state.operations.slice(indexFrom + 1)
        ];
        updatedOperations = [
            ...updatedOperations.slice(0, indexTo),
            newOperation,
            ...updatedOperations.slice(indexTo + 1)
        ];
        this.setState({
            operations: updatedOperations,
        });
    }

    render() {
        let nest = 0;
        const operationRows = this.state.operations.map((operation, index) => {
            let tartget_nest = nest;
            if (isBlockOperation(operation))
                nest += 1;
            if (isEndBlockOperation(operation)) {
                nest -= 1;
                tartget_nest = nest;
            }
            return (
                <Row key={index}>
                    <RowLine
                        number={index}
                        operation={operation}
                        comment=""
                        nest={tartget_nest}
                        handleAddRow={() => this.handleAddRow(index)}
                        handleRemoveRow={() => this.handleRemoveRow(index)}
                        handleMoveRowUp={() => this.handleMoveRowUp(index)}
                        handleMoveRowDown={() => this.handleMoveRowDown(index)}
                        handleSelectRow={() => this.handleSelectRow(index)}
                        handleChangeRowOperationFromDrag={
                            (newOperation, indexFrom, indexTo) => this.handleChangeRowOperationFromDrag(newOperation, indexFrom, indexTo)
                        }
                    />
                </Row>
            );
        });

        const manageAlgoButtons = (
            <GroupButton buttons={[
                <Button action={() => this.handleCreateAlgo()} classes="success">Create</Button>,
                <Button action={() => this.handleRunImplementation()}>Run</Button>
            ]} />
        );

        let code = "";
        if (this.state.selectedRow === -1) {
            code = (
                <>
                    <Form.Group as={Row}>
                        <Container>
                            {operationRows}
                        </Container>
                    </Form.Group>

                    {manageAlgoButtons}
                </>
            );
        } else {
            const selectedOperation = JSON.parse(JSON.stringify(this.state.operations[this.state.selectedRow]));
            code = (
                <OperationConstructor
                    funcs={funcs}
                    operation={selectedOperation}
                    handleSaveOperation={(updatedOperation) => this.handleSaveRowOperation(updatedOperation)}
                    handleClose={() => this.handleUnselectRow()}
                />
            );
        }

        return (
            <Form style={{
                width: '60%',
                margin: 'auto',
            }}>
                <PageTitle>
                    Create new algorithm
                </PageTitle>

                <Form.Group as={Row}>
                    <Form.Label>Title of the algorithm</Form.Label>
                    <Form.Control type="text" placeholder="Enter algorithm's title" ref={this.titleRef} />
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Short description</Form.Label>
                    <Form.Control as="textarea" rows={3} ref={this.descriptionRef}/>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Implementation</Form.Label>
                </Form.Group>

                {code}

                <Form.Group as={Row}>
                    <Form.Label>Errors</Form.Label>
                    <Form.Control id="code-running-error" as="textarea" rows={3} readOnly value={this.state.error} />
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Output</Form.Label>
                    <Form.Control id="code-output" as="textarea" rows={6} readOnly value={this.state.output} />
                </Form.Group>
            </Form>
        )
    }
}

export default compose(
    withAlgoBridgeService(),
    withRouter,
)(NewAlgoPage);
