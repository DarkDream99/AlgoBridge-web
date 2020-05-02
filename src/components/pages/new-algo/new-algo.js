import React, {Component} from 'react';
import {compose} from 'redux';

import './new-algo.css'
import PageTitle from "../../page-title";
import {Button, Container, Form, Row} from "react-bootstrap";
import RowLine from "../../code-ide/editor/row";
import OperationConstructor from "../../code-ide/operation-constructor";
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

// const operation1 = {
//     type: "assign",
//     parameter: {
//         left:  {type: "variable", parameter: {name: 'abc'}},
//         right: {type: "number", parameter: {val: 7}},
//     }
// };

// const operation2 = {
//     type: "assign",
//     parameter: {
//         left: {type: "variable", parameter: {name: 'var'}},
//         right: {type: "number", parameter: {val: 137}},
//     }
// };

// const operation3 = {
//     type: "assign",
//     parameter: {
//         left: {type: "variable", parameter: {name: 'var'}},
//         right: {type: "variable", parameter: {name: 'abc'}},
//     }
// };

// const operation4 = {
//     type: "for-loop",
//     parameter: {
//         index: {type: "variable", parameter: {name: 'i'}},
//         start: {type: "number", parameter: {val: 0}},
//         end: {type: "number", parameter: {val: 10}},
//         step: {type: "number", parameter: {val: 2}}
//     }
// };

// const operation5 = {
//     type: "end-for-loop",
//     parameter: {}
// };

// const operation6 = {
//     type: "assign",
//     parameter: {
//         left: {type: 'variable', parameter: {name: 'var'}},
//         right: {type: 'array', parameter: {values: [5, 6, -3, 'abc']}},
//     }
// };

// const operation7 = {
//     type: "function",
//     parameter: {
//         name: "abc",
//         param1: {type: 'variable', parameter: {name: 'var'}},
//         param2: {type: 'number', parameter: {val: -30}},
//         param3: {type: 'variable', parameter: {name: 'boc'}},
//     }
// };

// const operation8 = {
//     type: "assign",
//     parameter: {
//         left: {type: 'variable', parameter: {name: 'var'}},
//         right: {
//             type: 'multiplication',
//             parameter: {
//                 left: {type: 'number', parameter: {val: 5}},
//                 right: {type: 'number', parameter: {val: 8}}
//             }
//         }
//     }
// };

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

    handleCreateAlgo = (event) => {
        event.preventDefault();
        let title = this.titleRef.current.value;
        let description = this.descriptionRef.current.value;
        let operations = JSON.stringify(this.state.operations);

        this.algoBridgeService.createAlgo(title, description, operations)
        .then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const operationRows = this.state.operations.map((item, index) => {
            return (
                <Row key={index}>
                    <RowLine
                        number={index}
                        operation={item}
                        comment=""
                        handleAddRow={() => this.handleAddRow(index)}
                        handleRemoveRow={() => this.handleRemoveRow(index)}
                        handleMoveRowUp={() => this.handleMoveRowUp(index)}
                        handleMoveRowDown={() => this.handleMoveRowDown(index)}
                        handleSelectRow={() => this.handleSelectRow(index)}
                    />
                </Row>
            );
        });

        let code = "";
        if (this.state.selectedRow === -1) {
            code = (
                <>
                <Form.Group as={Row}>
                    <Container>
                        {operationRows}
                    </Container>
                </Form.Group>

                <Form.Group>
                    <Button variant="success" onClick={(event) => this.handleCreateAlgo(event)}>Create</Button>
                    <Button onClick={(event) => this.handleRunImplementation(event)}>Run</Button>
                    <Button>Visualize</Button>
                </Form.Group>
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
                <PageTitle title="Create new algorithm"/>

                <Form.Group as={Row}>
                    <Form.Label>Title of the algorithm</Form.Label>
                    <Form.Control type="text" placeholder="Enter algorithm's title" ref={this.titleRef} />
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Short description</Form.Label>
                    <Form.Control as="textarea" rows={3} ref={this.descriptionRef}/>
                </Form.Group>

                {/*
                <Form.Group as={Row}>
                    <Form.Label>Whole description</Form.Label>
                    <Form.Control type="file" accept=".pdf"/>
                </Form.Group>
                */}

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
    withAlgoBridgeService()
)(NewAlgoPage);
