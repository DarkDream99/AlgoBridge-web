import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Operation from "../operation";
import ParameterField from "./parameter-field";
import CodeInterface from "../interface";
import InputField from "./input-field";
import FunctionSelector from "./function-selector";
import {isValidVariable, isValidNumber} from "../../../validators";


class OperationConstructor extends Component {
    state = {
        params: [],
        resultOperation: null,
        selectedParamIndex: 0,
        showInputField: false,
        showFunctionSelector: false,
        inputLabel: "",
        inputError: "",
        inputType: "",
    };

    INTERMEDIATE_CHILDREN = [
        'left', 'right', 'index', 'start', 'end', 'step',
        'param1', 'param2', 'param3', 'param4', 'param5', 'param6', 'param7',
        'items_count',
    ];

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
            values: [
                'Assign', 'Larger', 'Larger or Equal', 'Less', 'Less or Equal',
                'Equals', 'And', 'Or', 'Sum', 'Subtraction', 'Multiplication',
                'Division'
            ],
            actions: [() => {
                this.setState({...this.emptyInput, inputType: 'assign'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'larger'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'larger-equal'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'less'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'less-equal'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'equal'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'and-logic'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'or-logic'}, () => {
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
                this.setState({...this.emptyInput, inputType: "array"}, () => {
                    this._handleSaveInputField();
                });
            }],
        }, {
            title: 'Constructions',
            values: ['Condition', 'End condition', 'Loop', 'End loop', 'Function'],
            actions: [() => {
                this.setState({...this.emptyInput, inputType: 'condition'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'end-condition'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'for-loop'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({...this.emptyInput, inputType: 'end-for-loop'}, () => {
                    this._handleSaveInputField();
                });
            }, () => {
                this.setState({
                    inputType: "function",
                    showFunctionSelector: true,
                    inputLabel: "Select function:",
                    inputError: "",
                });
            }]
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
            case "array":
                isValid = true
                let items_count = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "array",
                    parameter: {items_count: items_count}
                }
                break
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
            case "larger":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "larger",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case "larger-equal":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "larger-equal",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case "less":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "less",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case "less-equal":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "less-equal",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case "equal":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "equal",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case "and-logic":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "and-logic",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case "or-logic":
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: "or-logic",
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
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
            case "function":
                isValid = true;
                const name = value.name;
                const paramsCount = value.paramsCount;
                let params = {};

                for (let i = 1; i <= paramsCount; ++i) {
                    params[`param${i}`] = Object.assign({}, emptyOperand);
                }

                newOperation = {
                    type: "function",
                    parameter: {
                        name: name,
                        ...params,
                    }
                }
                break;
            case "condition":
                isValid = true;
                newOperation = {
                    type: "condition",
                    parameter: {
                        param1: Object.assign({}, emptyOperand),
                    }
                }
                break;
            case "end-condition":
                isValid = true;
                newOperation = {
                    type: "end-condition",
                    parameter: {}
                }
                break;
            default:
                break;
        }

        if (isValid) {
            // Update operation values from down to top
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
        } else {
            this.setState({inputError: "Incorrect value"});
        }
    };

    _handleCloseInputField = () => {
        this.setState({showInputField: false,  showFunctionSelector: false});
    };

    _updateParams = (operation, parentIndex=null, params=[]) => {
        // Update operation params from down to top
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
        return (
            <div>
                <InputField
                    show={this.state.showInputField}
                    handleClose={() => this._handleCloseInputField()}
                    handleSave={(value) => this._handleSaveInputField(value)}
                    label={this.state.inputLabel}
                    error={this.state.inputError}
                />
                <FunctionSelector 
                    funcs={funcs}
                    show={this.state.showFunctionSelector}
                    handleClose={() => this._handleCloseInputField()}
                    handleSave={(selectedFunc) => this._handleSaveInputField(selectedFunc)}
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
