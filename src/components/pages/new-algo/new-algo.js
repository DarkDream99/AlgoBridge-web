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
import TextField from '../../gui/text-field';
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

    render() {
      return (
        <div style={{
          width: '60%',
          margin: 'auto',
        }}>
          {this._makePageTitle()}
          {this._makeAlgoTitle()}
          {this._makeAlgoDescription()}
          {this._makeAlgoImplementationLabel()}
          {this._makeAlgoCode()}
          {this._makeAlgoErrors()}
          {this._makeAlgoOutputs()}
        </div>
      )
    }

    _makePageTitle() {
      return (
        <PageTitle>
          Create new algorithm
        </PageTitle>
      );
    }

    _makeAlgoTitle() {
      return (
        <div style={{paddingBottom: '20px'}}>
          <div>Title of the algorithm</div>
          <TextField classes='' placeholder="Enter algorithm's title" ref={this.titleRef} />
        </div>
      );
    }

    _makeAlgoDescription() {
      return (
        <div style={{paddingBottom: '20px'}}>
          <div>Short description</div>
          <textarea rows={3} ref={this.descriptionRef}/>
        </div>
      );
    }

    _makeAlgoImplementationLabel() {
      return (
        <div>
          <div>Implementation</div>
        </div>
      )
    }

    _makeAlgoErrors() {
      return (
        <div style={{paddingBottom: '20px'}}>
          <div>Errors</div>
          <Form.Control id="code-running-error" as="textarea" rows={3} readOnly value={this.state.error} />
        </div>
      )
    }

    _makeAlgoOutputs() {
      return (
        <div style={{paddingBottom: '20px'}}>
          <div>Output</div>
          <Form.Control id="code-output" as="textarea" rows={6} readOnly value={this.state.output} />
        </div>
      )
    }

    _makeAlgoCode() {
      let code = "";
      if (this.state.selectedRow === -1) {
        code = (
          <>
            <Form.Group as={Row}>
              <Container>
                {this._makeOperationRows()}
              </Container>
            </Form.Group>

            {this._makeAlgoManageButtons()}
          </>
        );
      } else {
        const selectedOperation = JSON.parse(JSON.stringify(this.state.operations[this.state.selectedRow]));
        code = (
          <OperationConstructor
            funcs={funcs}
            operation={selectedOperation}
            handleSaveOperation={(updatedOperation) => this.handleSaveRowOperation(updatedOperation)}
            handleClose={() => this._handleUnselectRow()}
          />
        );
      }

      return code
    }

    _handleUnselectRow = () => {
        this.setState({'selectedRow': -1});
    };

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

    _makeAlgoManageButtons() {
      return (
        <GroupButton buttons={[
          <Button key='create'
                  action={() => this._handleCreateAlgo()}
                  classes="success">
              Create
          </Button>,
          <Button key='run'
                  action={() => this._handleRunImplementation()}>
              Run
          </Button>
        ]} />
      )
    }

    _handleCreateAlgo = () => {
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

    _handleRunImplementation = (event) => {
        this.algoBridgeService.runImplementation(JSON.stringify(this.state.operations))
        .then((result) => {
            if (Array.isArray(result)) {
                let vars = result;
                let wileVars = "";
                vars.forEach((item) => {
                    wileVars += `${item["type"]} '${item["name"]}': ${item["value"]}\n`;
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

    _makeOperationRows() {
      let nest = 0;
      return this.state.operations.map((operation, index) => {
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
              handleAddRow={() => this._handleAddRow(index)}
              handleRemoveRow={() => this._handleRemoveRow(index)}
              handleMoveRowUp={() => this._handleMoveRowUp(index)}
              handleMoveRowDown={() => this._handleMoveRowDown(index)}
              handleSelectRow={() => this._handleSelectRow(index)}
              handleChangeRowOperationFromDrag={
                  (newOpr, indFrom, indTo) => this._handleChangeRowOperationFromDrag(newOpr, indFrom, indTo)
              }
            />
          </Row>
        );
      });
    }

    _handleSelectRow = (index) => {
       this.setState({'selectedRow': index});
    };

    _handleChangeRowOperationFromDrag = (newOperation, indexFrom, indexTo) => {
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

    _handleAddRow = (index) => {
        const emptyOperation = {type: 'empty', parameter: {}};
        const updatedOperations = [
            ...this.state.operations.slice(0, index+1),
            emptyOperation,
            ...this.state.operations.slice(index+1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    };

    _handleRemoveRow = (index) => {
        if (this.state.operations.length === 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    _handleMoveRowUp = (index) => {
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

    _handleMoveRowDown = (index) => {
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
}

export default compose(
    withAlgoBridgeService(),
    withRouter,
)(NewAlgoPage);
