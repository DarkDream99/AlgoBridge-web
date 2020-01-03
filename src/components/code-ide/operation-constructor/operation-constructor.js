import React, {Component} from "react";
import Operation from "../operation";
import ParameterField from "./parameter-field";
import CodeInterface from "../interface";
import InputField from "./input-field";
import {isValidNumber} from "../../../validators";


class OperationConstructor extends Component {
    state = {
        params: [],
        resultOperation: null,
        selectedParamIndex: 1,
        showInputField: false,
        inputLabel: "",
        inputError: "",
        inputType: "",
    };

    testGroups = [
        {
            title: 'Variables',
            values: ['Create new'],
            actions: [() => {
            }],
        }, {
            title: 'Operands',
            values: ['Assign', 'Sum', 'Subtraction', 'Multiplication', 'Division'],
            actions: [() => {
            }, () => {
            }, () => {
            }, () => {
            }, () => {
            }],
        }, {
            title: 'Primitives',
            values: ['Number', 'Array'],
            actions: [() => {
                this.setState({
                    inputLabel: "Enter number:",
                    showInputField: true,
                    inputType: "number",
                    inputError: "",
                });
            }, () => {
            }],
        }
    ];

    nextIndex = 0;
    constructor(props) {
        super(props);
        this.state.resultOperation = props.operation;
        this.nextIndex = 0;
        this.state.params = this._updateParams(props.operation);
    }

    _handleSaveInputField = (value) => {
        console.log(value);
        this.setState({inputError: ""});

        let isValid = true;
        let newOperation = null;
        switch (this.state.inputType) {
            case "number":
                isValid = isValidNumber(value);
                newOperation = {
                    type: "number",
                    parameter: {val: value}
                };
                break;
            default:
                break;
        }

        if (isValid) {
            var startIndex = this.state.selectedParamIndex;
            var selectedParam = this.state.params.find((element, index, array) => {
                return element.index === startIndex;
            });
            newOperation.index = selectedParam.index;
            selectedParam.operation = newOperation;
            selectedParam.childrenIds = [];

            let nextOperation = Object.assign({}, selectedParam.operation);
            // TODO add params if neccessery
            while (startIndex) {
                const parentIndex = selectedParam.parentIndex;

                selectedParam = this.state.params.find((element, index, array) => {
                    return element.index === parentIndex;
                });

                if (selectedParam.operation.parameter.left && selectedParam.operation.parameter.left.index === startIndex) {
                    selectedParam.operation.parameter.left = nextOperation;
                }
                if (selectedParam.operation.parameter.right && selectedParam.operation.parameter.right.index === startIndex) {
                    selectedParam.operation.parameter.right = nextOperation;
                }
                nextOperation = Object.assign({}, selectedParam.operation);
                startIndex = parentIndex;
            }
            this.setState({resultOperation: nextOperation});
            this.nextIndex = 0;
            this.setState({params: this._updateParams(nextOperation)});

            this._handleCloseInputField();
        } else {
            this.setState({inputError: "Incorrect value"});
        }
    };

    _handleCloseInputField = () => {
        this.setState({showInputField: false})
    };

    _updateParams = (operation, parentIndex=null, params=[]) => {
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
            params = this._updateParams(operation.parameter.left, index, params);
            params = this._updateParams(operation.parameter.right, index, params);
        }
        return params;
    };

    setSelectedParam = (newIndex) => {
        this.setState({selectedParamIndex: newIndex});
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

        return (
            <div>
                <InputField
                    show={this.state.showInputField}
                    handleClose={() => this._handleCloseInputField()}
                    handleSave={(value) => this._handleSaveInputField(value)}
                    label={this.state.inputLabel}
                    error={this.state.inputError}
                />
                <CodeInterface groups={this.testGroups}/>
                <div><Operation {...this.state.resultOperation}/></div>
                {params}
            </div>
        );
    }
}

export default OperationConstructor;
