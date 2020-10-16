import React, {Component} from "react";
import GroupInterfaceItem from "./group-item";
import {OperationTypes} from '../core';
import InputField from '../operation-constructor/input-field';
import {isValidVariable, isValidNumber} from '../../../validators';

import "./interface.css";


class CodeInterface extends Component {

    state = {
        showInputField: false,
        showFunctionSelector: false,
        inputLabel: '',
        inputError: '',
        inputType: '',
    };

    render() {
        const content = this._getOperationGroups().map((group) => (
            <GroupInterfaceItem
                key={group.title}
                title={group.title}
                values={group.values}
                actions={group.actions}
            />
        ));

        return (
            <div style={{display: 'flex'}}>
                <InputField
                    show={this.state.showInputField}
                    handleClose={() => this._handleCloseInputField()}
                    handleSave={(value) => this._onSaveInputField(this.state.inputType, value)}
                    label={this.state.inputLabel}
                    error={this.state.inputError}
                />
                {content}
            </div>
        );
    }

    _handleCloseInputField = () => {
        this.setState({
            showInputField: false,
            showFunctionSelector: false
        });
    };

    _getOperationGroups() {
        return [
            {
                title: 'Variables',
                values: ['Create new'],
                actions: [() => this._handleOperationCommand(OperationTypes.VARIABLE)],
            }, {
                title: 'Operands',
                values: [
                    'Assign', 'Larger', 'Larger or Equal', 'Less', 'Less or Equal',
                    'Equals', 'And', 'Or', 'Sum', 'Subtraction', 'Multiplication',
                    'Division', 'Get item', 'Set item'
                ],
                actions: [
                    () => this._handleOperationCommand(OperationTypes.ASSIGN),
                    () => this._handleOperationCommand(OperationTypes.LARGER),
                    () => this._handleOperationCommand(OperationTypes.LARGER_EQUAL),
                    () => this._handleOperationCommand(OperationTypes.LESS),
                    () => this._handleOperationCommand(OperationTypes.LARGER_EQUAL),
                    () => this._handleOperationCommand(OperationTypes.EQUAL),
                    () => this._handleOperationCommand(OperationTypes.AND_LOGIC),
                    () => this._handleOperationCommand(OperationTypes.OR_LOGIC),
                    () => this._handleOperationCommand(OperationTypes.SUM),
                    () => this._handleOperationCommand(OperationTypes.SUBTRACTION),
                    () => this._handleOperationCommand(OperationTypes.MULTIPLICATION),
                    () => this._handleOperationCommand(OperationTypes.DIVISION),
                    () => this._handleOperationCommand(OperationTypes.GET_ITEM),
                    () => this._handleOperationCommand(OperationTypes.SET_ITEM),
                ],
            }, {
                title: 'Primitives',
                values: ['Number', 'Array'],
                actions: [
                    () => this._handleOperationCommand(OperationTypes.NUMBER),
                    () => this._handleOperationCommand(OperationTypes.ARRAY),
                ],
            }, {
                title: 'Constructions',
                values: ['Condition', 'End condition', 'Loop', 'End loop'],
                actions: [
                    () => this._handleOperationCommand(OperationTypes.CONDITION),
                    () => this._handleOperationCommand(OperationTypes.END_CONDITION),
                    () => this._handleOperationCommand(OperationTypes.FOR_LOOP),
                    () => this._handleOperationCommand(OperationTypes.END_FOR_LOOP),
                    () => this._handleOperationCommand('function')
                ]
            }
        ];
    }

    _handleOperationCommand(operationType) {
        const emptyInput = {
            inputLabel: "",
            showInputField: false,
            inputType: "",
            inputError: "",
        }

        switch (operationType) {
            case OperationTypes.VARIABLE:
                this.setState({
                    inputLabel: "Enter name:",
                    showInputField: true,
                    inputType: OperationTypes.VARIABLE,
                    inputError: "",
                });
                break;

            case OperationTypes.NUMBER:
                this.setState({
                    inputLabel: "Enter number:",
                    showInputField: true,
                    inputType: OperationTypes.NUMBER,
                    inputError: "",
                });
                break;

            case 'function':
                this.setState({
                    inputType: "function",
                    showFunctionSelector: true,
                    inputLabel: "Select function:",
                    inputError: "",
                });
                break;

            default:
                this.setState({
                    ...emptyInput,
                    inputType: operationType,
                }, () => this._onSaveInputField(this.state.inputType))
                break;
        }
    }

    _onSaveInputField = (inputType, value='') => {
        let isValid = true;
        let newOperation = null;
        const emptyOperand = {type: "empty", parameter: {}};
        var leftOperand = null;
        var rightOperand = null;

        switch (inputType) {
            case OperationTypes.NUMBER:
                isValid = isValidNumber(value);
                newOperation = {
                    type: OperationTypes.NUMBER,
                    parameter: {val: value}
                };
                break;
            case OperationTypes.ARRAY:
                isValid = true
                let items_count = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.ARRAY,
                    parameter: {items_count: items_count}
                }
                break
            case OperationTypes.VARIABLE:
                isValid = isValidVariable(value);
                newOperation = {
                    type: "variable",
                    parameter: {name: value}
                }
                break;
            case OperationTypes.ASSIGN:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.ASSIGN,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case OperationTypes.LARGER:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.LARGER,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.LARGER_EQUAL:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.LARGER_EQUAL,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.GET_ITEM:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.GET_ITEM,
                    parameter: {
                        index: leftOperand,
                        arrName: rightOperand,
                    }
                }
                break;
            case OperationTypes.SET_ITEM:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                let valueOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.SET_ITEM,
                    parameter: {
                        index: leftOperand,
                        arrName: rightOperand,
                        newValue: valueOperand
                    }
                }
                break;
            case OperationTypes.LESS:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.LESS,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.LESS_EQUAL:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.LESS_EQUAL,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.EQUAL:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.EQUAL,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.AND_LOGIC:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.AND_LOGIC,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.OR_LOGIC:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.OR_LOGIC,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand
                    }
                }
                break;
            case OperationTypes.SUM:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.SUM,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case OperationTypes.SUBTRACTION:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.SUBTRACTION,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case OperationTypes.MULTIPLICATION:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.MULTIPLICATION,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case OperationTypes.DIVISION:
                isValid = true;
                leftOperand = Object.assign({}, emptyOperand);
                rightOperand = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.DIVISION,
                    parameter: {
                        left: leftOperand,
                        right: rightOperand,
                    }
                }
                break;
            case OperationTypes.FOR_LOOP:
                isValid = true;
                let index = Object.assign({}, emptyOperand);
                let start = Object.assign({}, emptyOperand);
                let end = Object.assign({}, emptyOperand);
                let step = Object.assign({}, emptyOperand);
                newOperation = {
                    type: OperationTypes.FOR_LOOP,
                    parameter: {
                        index: index,
                        start: start,
                        end: end,
                        step: step
                    }
                }
                break;
            case OperationTypes.END_FOR_LOOP:
                isValid = true;
                newOperation = {
                    type: OperationTypes.END_FOR_LOOP,
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
            case OperationTypes.CONDITION:
                isValid = true;
                newOperation = {
                    type: OperationTypes.CONDITION,
                    parameter: {
                        param1: Object.assign({}, emptyOperand),
                    }
                }
                break;
            case OperationTypes.END_CONDITION:
                isValid = true;
                newOperation = {
                    type: OperationTypes.END_CONDITION,
                    parameter: {}
                }
                break;
            default:
                break;
        }

        if (isValid) {
            const {updateOperation} = this.props;
            updateOperation(newOperation);
        } else {
            this.setState({inputError: "Incorrect value"});
        }
    }
};

export default CodeInterface;
