import React, {Component} from "react";

import Button from '../../gui/button';
import ButtonGroup from '../../gui/button-group';
import CodeInterface from "../interface";
import FunctionSelector from "./function-selector";
import OperationComponent from "../operation";
import ParameterField from "./parameter-field";

import Operation, {OperationTypes} from '../core';

import './style/operation-constructor.css';


class OperationConstructor extends Component {
    state = {
        params: [],
        resultOperation: null,
        selectedParamIndex: 0,
    };

    INTERMEDIATE_CHILDREN = [
        'left', 'right', 'arrName', 'index', 'start', 'end', 'step',
        'param1', 'param2', 'param3', 'param4', 'param5', 'param6', 'param7',
        'items_count', 'newValue'
    ];

    nextIndex = 0;
    constructor(props) {
        super(props);
        this.nextIndex = 0;
        this.state.resultOperation = props.operation;
        this.state.params = this._updateParams(props.operation);
    }

    _updateOperation(newOperation) {
        /* *
         * Update all inner operations inheritance from the edited to the root
         * */

        var startIndex = this.state.selectedParamIndex;
        var selectedParam = this.state.params.find((element, index, array) => {
            return element.index === startIndex;
        });
        newOperation.index = selectedParam.index;
        selectedParam.operation = newOperation;
        selectedParam.childrenIds = [];

        let nextOperation = Object.assign({}, selectedParam.operation);
        while (startIndex) {
            const parentIndex = selectedParam.parentIndex;

            selectedParam = this.state.params.find((element, index, array) => {
                return element.index === parentIndex;
            });

            for (let parameterKey in selectedParam.operation.parameter) {
                let parameter = selectedParam.operation.parameter[parameterKey];
                if (parameter.index === startIndex) {
                    selectedParam.operation.parameter[parameterKey] = nextOperation;
                }
            }
            for (let parameterKey in selectedParam.operation.parameter.params) {
                let parameter = selectedParam.operation.parameter.params[parameterKey];
                if (parameter.index === startIndex) {
                    selectedParam.operation.parameter.params[parameterKey] = nextOperation;
                }
            }

            nextOperation = Object.assign({}, selectedParam.operation);
            startIndex = parentIndex;
        }
        this.setState({resultOperation: nextOperation});
        this.nextIndex = 0;
        this.setState({params: this._updateParams(nextOperation)});

        this._handleCloseInputField();
    }

    _handleCloseInputField = () => {
        this.setState({showInputField: false,  showFunctionSelector: false});
    };

    _updateParams = (operation, parentIndex=null, params=[]) => {
        /* *
         * Update list of the operation params from down to top
         * */

        if (operation) {
            const index = this.nextIndex;
            operation.index = index;
            params.push({
                index,
                operation,
                parentIndex,
                childrenIds: [],
            });
            if (parentIndex !== null) {
                const parent = params.find((element, index, array) => {
                    return element.index === parentIndex;
                });
                parent.childrenIds.push(index);
            }

            this.nextIndex += 1;
            this.INTERMEDIATE_CHILDREN.forEach((parameterKey) => {
                params = this._updateParams(operation.parameter[parameterKey], index, params);
            });
            for (let paramKey in operation.parameter.params) {
                params = this._updateParams(
                    operation.parameter.params[paramKey], index, params
                );
            }
        }
        return params;
    };

    setSelectedParam = (newIndex) => {
        this.setState({selectedParamIndex: newIndex});
    };

    _handleSaveOperation = () => {
        const {handleSaveOperation} = this.props;
        handleSaveOperation(this.state.resultOperation);
    };

    render() {
        const params = this.state.params.map((param) => (
            <ParameterField
                key={param.index}
                {...param}
                setSelectedParam={this.setSelectedParam}
                isSelected={this.state.selectedParamIndex === param.index}
            />
        ));

        const {handleClose, funcs} = this.props;
        const manageOperationButtons = (
            <ButtonGroup buttons={[
                <Button key='save' classes="success" action={() => this._handleSaveOperation()}>
                    Save
                </Button>,
                <Button key='cancel' action={() => handleClose()}>
                    Cancel
                </Button>
            ]}/>
        );

        return (
            <div>
                <CodeInterface handleOperationCommand={(operationType) => this.handleOperationCommand(operationType)}
                               onSaveInputField={(inputType, val='') => this._handleSaveInputField(inputType, val)}
                               updateOperation={(newOperation) => this._updateOperation(newOperation)}/>
                <div className="target-operation">
                    <OperationComponent {...this.state.resultOperation} />
                </div>
                {params}
                {manageOperationButtons}
            </div>
        );
    }
}

export default OperationConstructor;
