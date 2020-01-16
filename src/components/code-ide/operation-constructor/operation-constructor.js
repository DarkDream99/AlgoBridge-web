import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Operation from "../operation";
import ParameterField from "./parameter-field";
import CodeInterface from "../interface";
import InputField from "./input-field";
import {isValidVariable, isValidNumber} from "../../../validators";


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

    emptyInput = {
        inputLabel: "",
        showInputField: false,
        inputType: "",
        inputError: "",
    }

    testGroups = [
        {
            title: 'Variables',
            values: ['Create new'],
            actions: [() => {
                this.setState({
                    inputLabel: "Enter name:",
                    showInputField: true,
                    inputType: "variable",
                    inputError: "",
                });
            }],
        }, {
            title: 'Operands',
            values: ['Assign', 'Sum', 'Subtraction', 'Multiplication', 'Division'],
            actions: [() => {
                this.setState({...this.emptyInput, inputType: 'assign'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'sum'}, () => {
                    this._handleSaveInputField();
                })
            }, () => {
                this.setState({...this.emptyInput, inputType: 'subtraction'}, () => {
                    this._handleSaveInputField();
                })
            }, () => {
                this.setState({...this.emptyInput, inputType: 'multiplication'}, () => {
                    this._handleSaveInputField();
                })
            }, () => {
                this.setState({...this.emptyInput, inputType: 'division'}, () => {
                    this._handleSaveInputField();
                })
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
                // TODO Add array handler
            }],
        }, {
            title: 'Constructions',
            values: ['Loop', 'End loop', 'Method', 'Function'],
            actions: [() => {
                this.setState({...this.emptyInput, inputType: 'for-loop'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'end-for-loop'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {}, () => {}]
        }
    ];

    nextIndex = 0;
    constructor(props) {
        super(props);
        this.state.resultOperation = props.operation;
        this.nextIndex = 0;
        this.state.params = this._updateParams(props.operation);
    }

    _handleSaveInputField = (value="") => {
        this.setState({inputError: ""});

        let isValid = true;
        let newOperation = null;
        const emptyOperand = {type: "empty", parameter: {}};
        var leftOperand = null;
        var rightOperand = null;
        
        switch (this.state.inputType) {
            case "number":
                isValid = isValidNumber(value);
                newOperation = {
                    type: "number",
                    parameter: {val: value}
                };
                break;
            case "variable":
                isValid = isValidVariable(value);
                newOperation = {
                    type: "variable",
                    parameter: {name: value}
                }
                break;
            case "assign":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "assign",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case "sum":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "sum",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case "subtraction":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "subtraction",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case "multiplication":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "multiplication",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case "division":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "division",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case "for-loop":
                isValid = true;
                let index = Object.assign({}, emptyOperand);
                let start = Object.assign({}, emptyOperand);
                let end = Object.assign({}, emptyOperand);
                let step = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "for-loop",
                    parameter: {
                        index: index,
                        start: start,
                        end: end,
                        step: step
                    }
                }
                break;
            case "end-for-loop":
                isValid = true;
                newOperation = {
                    type: "end-for-loop",
                    parameter: {}
                };
                break;
            default:
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
                if (selectedParam.operation.parameter.index && selectedParam.operation.parameter.index.index === startIndex) {
                    selectedParam.operation.parameter.index = nextOperation;
                }
                if (selectedParam.operation.parameter.start && selectedParam.operation.parameter.start.index === startIndex) {
                    selectedParam.operation.parameter.start = nextOperation;
                }
                if (selectedParam.operation.parameter.end && selectedParam.operation.parameter.end.index === startIndex) {
                    selectedParam.operation.parameter.end = nextOperation;
                }
                if (selectedParam.operation.parameter.step && selectedParam.operation.parameter.step.index === startIndex) {
                    selectedParam.operation.parameter.step = nextOperation;
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
            params = this._updateParams(operation.parameter.index, index, params);
            params = this._updateParams(operation.parameter.start, index, params);
            params = this._updateParams(operation.parameter.end, index, params);
            params = this._updateParams(operation.parameter.step, index, params);
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

        const {handleClose} = this.props;
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
                <Button 
                    variant="success" 
                    onClick={() => this._handleSaveOperation()}>
                        Save
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => handleClose()}>
                        Cancel
                </Button>
            </div>
        );
    }
}

export default OperationConstructor;
