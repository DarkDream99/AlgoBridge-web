import React, {Component} from "react";
import GroupInterfaceItem from "./group-item";
import Operation, {OperationTypes} from '../core';
import InputField from '../operation-constructor/input-field';
import {isValidVariable, isValidNumber} from '../../../validators';

import "./interface.css";


class CodeInterface extends Component {

    constructor(props) {
        super(props);

        this.emptyOperand = {type: "empty", parameter: {}};
        this.state = {
            showInputField: false,
            showFunctionSelector: false,
            inputLabel: '',
            inputError: '',
            inputType: '',
        };
    }

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
        switch (inputType) {
            case OperationTypes.NUMBER:
                isValid = isValidNumber(value);
                break;
            case OperationTypes.VARIABLE:
                isValid = isValidVariable(value);
                break;
            default:
                break;
        }

        if (isValid) {
            const {updateOperation} = this.props;
            let newOperation = this._buildOperationByType(inputType, value);
            updateOperation(newOperation);
        } else {
            this.setState({inputError: "Incorrect value"});
        }
    }

    _buildOperationByType(operationType, value) {
        let operationBuilders = {};
        operationBuilders[OperationTypes.NUMBER] = () => this._buildNumberOperation(value);
        operationBuilders[OperationTypes.ARRAY] = () => this._buildArrayOperation();
        operationBuilders[OperationTypes.VARIABLE] = () => this._buildVariableOperation(value);
        operationBuilders[OperationTypes.ASSIGN] = () => this._buildBinaryOperation(OperationTypes.ASSIGN);
        operationBuilders[OperationTypes.LARGER] = () => this._buildBinaryOperation(OperationTypes.LARGER);
        operationBuilders[OperationTypes.LARGER_EQUAL] = () => this._buildBinaryOperation(OperationTypes.LARGER_EQUAL);
        operationBuilders[OperationTypes.LESS] = () => this._buildBinaryOperation(OperationTypes.LESS);
        operationBuilders[OperationTypes.LESS_EQUAL] = () => this._buildBinaryOperation(OperationTypes.LESS_EQUAL);
        operationBuilders[OperationTypes.EQUAL] = () => this._buildBinaryOperation(OperationTypes.EQUAL);
        operationBuilders[OperationTypes.AND_LOGIC] = () => this._buildBinaryOperation(OperationTypes.AND_LOGIC);
        operationBuilders[OperationTypes.OR_LOGIC] = () => this._buildBinaryOperation(OperationTypes.OR_LOGIC);
        operationBuilders[OperationTypes.SUM] = () => this._buildBinaryOperation(OperationTypes.SUM);
        operationBuilders[OperationTypes.SUBTRACTION] = () => this._buildBinaryOperation(OperationTypes.SUBTRACTION);
        operationBuilders[OperationTypes.MULTIPLICATION] = () => this._buildBinaryOperation(OperationTypes.MULTIPLICATION);
        operationBuilders[OperationTypes.DIVISION] = () => this._buildBinaryOperation(OperationTypes.DIVISION);
        operationBuilders[OperationTypes.FOR_LOOP] = () => this._buildForLoopOperation();
        operationBuilders[OperationTypes.END_FOR_LOOP] = () => this._buildEndForLoopOperation();
        operationBuilders[OperationTypes.CONDITION] = () => this._buildConditionOperation();
        operationBuilders[OperationTypes.END_CONDITION] = () => this._buildEndConditionOperation();
        operationBuilders[OperationTypes.GET_ITEM] = () => this._buildGetItemOperation();
        operationBuilders[OperationTypes.SET_ITEM] = () => this._buildSetItemOperation();
        operationBuilders['function'] = () => this._buildFunctionOperation(value);

        let builtOperation = null
        if (operationType in operationBuilders) {
            builtOperation = operationBuilders[operationType]();
        }
        return builtOperation;
    }

    _buildNumberOperation(value) {
        return new Operation(OperationTypes.NUMBER, {val: value});
    }

    _buildArrayOperation() {
        let items_count = new Operation();
        return new Operation(OperationTypes.ARRAY, {items_count});
    }

    _buildVariableOperation(value) {
        return new Operation(OperationTypes.VARIABLE, {name: value});
    }

    _buildGetItemOperation() {
        const index = new Operation();
        const arrName = new Operation();
        return new Operation(OperationTypes.GET_ITEM, {index, arrName});
    }

    _buildSetItemOperation() {
        const index = new Operation();
        const arrName = new Operation();
        const newValue = new Operation();
        return new Operation(OperationTypes.SET_ITEM, {index, arrName, newValue});
    }

    _buildBinaryOperation(operationType) {
        const left = new Operation();
        const right = new Operation();
        return new Operation(operationType, {left, right});
    }

    _buildForLoopOperation() {
        const index = new Operation();
        const start = new Operation();
        const end = new Operation();
        const step = new Operation();
        return new Operation(OperationTypes.FOR_LOOP, {index, start, end, step});
    }

    _buildEndForLoopOperation() {
        return new Operation(OperationTypes.END_FOR_LOOP);
    }

    _buildFunctionOperation(value) {
        const name = value.name;
        const paramsCount = value.paramsCount;
        let params = {};

        for (let i = 1; i <= paramsCount; ++i) {
            params[`param${i}`] = Object.assign({}, this.emptyOperand);
        }

        return new Operation('function', {name, ...params});
    }

    _buildConditionOperation() {
        const param1 = new Operation();
        return new Operation(OperationTypes.CONDITION, {param1});
    }

    _buildEndConditionOperation() {
        return new Operation(OperationTypes.END_CONDITION);
    }
};

export default CodeInterface;
