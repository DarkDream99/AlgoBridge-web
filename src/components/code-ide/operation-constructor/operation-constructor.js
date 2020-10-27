import React, {Component} from "react";

import Button from '../../gui/button';
import ButtonGroup from '../../gui/button-group';
import CodeInterface from "../interface";
import Operation from "../operation";
import ParameterField from "./parameter-field";

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
        this.state.resultOperation = props.operation;
        this.state.params = this._updateParams(props.operation);
    }

    render() {
        const params = this.state.params.map((param) => (
            <ParameterField
                key={param.index}
                {...param}
                setSelectedParam={this.setSelectedParam}
                isSelected={this.state.selectedParamIndex === param.index}
            />
        ));

        const {handleClose} = this.props;
        const manageOperationButtons = (
            <ButtonGroup buttons={[
                <Button key='save' classes="success" action={() => this.onSaveOperation()}>
                    Save
                </Button>,
                <Button key='cancel' action={() => handleClose()}>
                    Cancel
                </Button>
            ]}/>
        );

        return (
            <div>
                <CodeInterface updateOperation={(newOperation) => this._updateOperation(newOperation)}/>
                <div className="target-operation">
                    <Operation {...this.state.resultOperation} />
                </div>
                {params}
                {manageOperationButtons}
            </div>
        );
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

        let selectedOperation = Object.assign({}, selectedParam.operation);
        const rootOperation = this._updateInheritedOperationToRoot(selectedOperation, selectedParam);

        this.setState({resultOperation: rootOperation});
        this.nextIndex = 0;
        this.setState({params: this._updateParams(rootOperation)});
    }

    _updateInheritedOperationToRoot(currentOperation, currentParam) {
        let updatedOperation = Object.assign({}, currentOperation);
        let currentIndex = currentParam.index

        while (currentIndex) {
            const parentIndex = currentParam.parentIndex;
            let parentParam = this.state.params.find((element, index, array) => {
                return element.index === parentIndex;
            });

            for (let parameterKey in parentParam.operation.parameter) {
                let parentOperationParam = parentParam.operation.parameter[parameterKey];
                if (parentOperationParam.index === currentIndex) {
                    parentParam.operation.parameter[parameterKey] = updatedOperation;
                }
            }

            currentParam = parentParam;
            updatedOperation = Object.assign({}, parentParam.operation);
            currentIndex = parentIndex;
        }
        return updatedOperation
    }

    _updateParams = (operation, parentIndex=null, params=[]) => {
        /* *
         * Update list of the operation params from root to leaves
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
        }
        return params;
    };

    setSelectedParam = (newIndex) => {
        this.setState({selectedParamIndex: newIndex});
    };

    onSaveOperation = () => {
        const {handleSaveOperation} = this.props;
        handleSaveOperation(this.state.resultOperation);
    };
}

export default OperationConstructor;
