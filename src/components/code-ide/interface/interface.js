import React, {Component} from "react";
import {compose} from 'redux';

import GroupInterfaceItem from "./group-item";
import Operation, {OperationTypes} from '../core';
import InputField from '../operation-constructor/input-field';
import {isValidVariable, isValidNumber} from '../../../validators';
import withAlgoBridgeService from '../../hoc/with-algobridge-service';

import "./interface.css";


class CodeInterface extends Component {

    emptyOperand = {type: "empty", parameter: {}};
    state = {
        showInputField: false,
        showFunctionSelector: false,
        inputLabel: '',
        inputError: '',
        inputType: '',

        operationTypes: [],
    };

    componentDidMount() {
        const {algoBridgeService} = this.props;

        algoBridgeService.loadOperationTypes().then(
            (data) => {
                this.setState({operationTypes: data})
            }
        );
    }

    render() {
        if (this.state.operationTypes.length) {
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
                        handleClose={() => this._onCloseInputField()}
                        handleSave={(value) => this._onSaveInputField(this.state.inputType, value)}
                        label={this.state.inputLabel}
                        error={this.state.inputError}
                    />
                    {content}
                </div>
            );
        }
        return <div>Loading operation types ...</div>
    }

    _getOperationGroups() {
        let operationGroups = {};
        const {operationTypes} = this.state;

        operationTypes.forEach((item) => {
            let group = item.category.display_name;
            if (!operationGroups.hasOwnProperty(group)) {
                operationGroups[group] = {values: [], actions: []}
            }
            operationGroups[group].values.push(item.display_name);
            operationGroups[group].actions.push(() => this._onSelectOperation(item));
        });

        let groupList = [];
        for (let groupName in operationGroups) {
            groupList.push({
                title: groupName,
                values: operationGroups[groupName].values,
                actions: operationGroups[groupName].actions
            })
        }
        return groupList;
        // return [
        //     {
        //         title: 'Variables',
        //         values: ['Create new'],
        //         actions: [() => this._onSelectOperation(OperationTypes.VARIABLE)],
        //     }, {
        //         title: 'Operands',
        //         values: [
        //             'Assign', 'Larger', 'Larger or Equal', 'Less', 'Less or Equal',
        //             'Equals', 'And', 'Or', 'Sum', 'Subtraction', 'Multiplication',
        //             'Division', 'Get item', 'Set item'
        //         ],
        //         actions: [
        //             () => this._onSelectOperation(OperationTypes.ASSIGN),
        //             () => this._onSelectOperation(OperationTypes.LARGER),
        //             () => this._onSelectOperation(OperationTypes.LARGER_EQUAL),
        //             () => this._onSelectOperation(OperationTypes.LESS),
        //             () => this._onSelectOperation(OperationTypes.LARGER_EQUAL),
        //             () => this._onSelectOperation(OperationTypes.EQUAL),
        //             () => this._onSelectOperation(OperationTypes.AND_LOGIC),
        //             () => this._onSelectOperation(OperationTypes.OR_LOGIC),
        //             () => this._onSelectOperation(OperationTypes.SUM),
        //             () => this._onSelectOperation(OperationTypes.SUBTRACTION),
        //             () => this._onSelectOperation(OperationTypes.MULTIPLICATION),
        //             () => this._onSelectOperation(OperationTypes.DIVISION),
        //             () => this._onSelectOperation(OperationTypes.GET_ITEM),
        //             () => this._onSelectOperation(OperationTypes.SET_ITEM),
        //         ],
        //     }, {
        //         title: 'Primitives',
        //         values: ['Number', 'Array'],
        //         actions: [
        //             () => this._onSelectOperation(OperationTypes.NUMBER),
        //             () => this._onSelectOperation(OperationTypes.ARRAY),
        //         ],
        //     }, {
        //         title: 'Constructions',
        //         values: ['Condition', 'End condition', 'Loop', 'End loop'],
        //         actions: [
        //             () => this._onSelectOperation(OperationTypes.CONDITION),
        //             () => this._onSelectOperation(OperationTypes.END_CONDITION),
        //             () => this._onSelectOperation(OperationTypes.FOR_LOOP),
        //             () => this._onSelectOperation(OperationTypes.END_FOR_LOOP),
        //             () => this._onSelectOperation('function')
        //         ]
        //     }
        // ];
    }

    _onSelectOperation(operationType) {
        const emptyInput = {
            inputLabel: "",
            showInputField: false,
            inputType: "",
            inputError: "",
        }

        switch (operationType.name) {
            case OperationTypes.VARIABLE:
                this.setState({
                    inputLabel: "Enter name:",
                    showInputField: true,
                    inputType: operationType,
                    inputError: "",
                });
                break;

            case OperationTypes.NUMBER:
                this.setState({
                    inputLabel: "Enter number:",
                    showInputField: true,
                    inputType: operationType,
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
                }, () => this._onSaveInputField(operationType))
                break;
        }
    }

    _onSaveInputField = (operationType, value='') => {
        let isValid = true;
        switch (operationType.name) {
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
            let newOperation = this._buildOperationByType(operationType, value);
            updateOperation(newOperation);
            this._onCloseInputField();
        } else {
            this.setState({inputError: "Incorrect value"});
        }
    }

    _onCloseInputField = () => {
        this.setState({
            showInputField: false,
            showFunctionSelector: false
        });
    };

    _buildOperationByType(operationType, value) {
        let builtOperation = new Operation(operationType.name);
        let parameter = {};

        if (operationType.is_primitive) {
            parameter[operationType.parameters[0]] = value;
        } else {
            for (let parameterKey in operationType.parameters) {
                let parameterName = operationType.parameters[parameterKey]
                parameter[parameterName] = new Operation();
            }
        }

        builtOperation.parameter = parameter;
        return builtOperation;

        // let operationBuilders = {};
        // operationBuilders[OperationTypes.NUMBER] = () => this._buildNumberOperation(value);
        // operationBuilders[OperationTypes.ARRAY] = () => this._buildArrayOperation();
        // operationBuilders[OperationTypes.VARIABLE] = () => this._buildVariableOperation(value);
        // operationBuilders[OperationTypes.ASSIGN] = () => this._buildBinaryOperation(OperationTypes.ASSIGN);
        // operationBuilders[OperationTypes.LARGER] = () => this._buildBinaryOperation(OperationTypes.LARGER);
        // operationBuilders[OperationTypes.LARGER_EQUAL] = () => this._buildBinaryOperation(OperationTypes.LARGER_EQUAL);
        // operationBuilders[OperationTypes.LESS] = () => this._buildBinaryOperation(OperationTypes.LESS);
        // operationBuilders[OperationTypes.LESS_EQUAL] = () => this._buildBinaryOperation(OperationTypes.LESS_EQUAL);
        // operationBuilders[OperationTypes.EQUAL] = () => this._buildBinaryOperation(OperationTypes.EQUAL);
        // operationBuilders[OperationTypes.AND_LOGIC] = () => this._buildBinaryOperation(OperationTypes.AND_LOGIC);
        // operationBuilders[OperationTypes.OR_LOGIC] = () => this._buildBinaryOperation(OperationTypes.OR_LOGIC);
        // operationBuilders[OperationTypes.SUM] = () => this._buildBinaryOperation(OperationTypes.SUM);
        // operationBuilders[OperationTypes.SUBTRACTION] = () => this._buildBinaryOperation(OperationTypes.SUBTRACTION);
        // operationBuilders[OperationTypes.MULTIPLICATION] = () => this._buildBinaryOperation(OperationTypes.MULTIPLICATION);
        // operationBuilders[OperationTypes.DIVISION] = () => this._buildBinaryOperation(OperationTypes.DIVISION);
        // operationBuilders[OperationTypes.FOR_LOOP] = () => this._buildForLoopOperation();
        // operationBuilders[OperationTypes.END_FOR_LOOP] = () => this._buildEndForLoopOperation();
        // operationBuilders[OperationTypes.CONDITION] = () => this._buildConditionOperation();
        // operationBuilders[OperationTypes.END_CONDITION] = () => this._buildEndConditionOperation();
        // operationBuilders[OperationTypes.GET_ITEM] = () => this._buildGetItemOperation();
        // operationBuilders[OperationTypes.SET_ITEM] = () => this._buildSetItemOperation();
        // operationBuilders['function'] = () => this._buildFunctionOperation(value);

        // let builtOperation = null
        // if (operationType in operationBuilders) {
        //     builtOperation = operationBuilders[operationType]();
        // }
        // return builtOperation;
    }

    // _buildNumberOperation(value) {
    //     return new Operation(OperationTypes.NUMBER, {val: value});
    // }

    // _buildArrayOperation() {
    //     let items_count = new Operation();
    //     return new Operation(OperationTypes.ARRAY, {items_count});
    // }

    // _buildVariableOperation(value) {
    //     return new Operation(OperationTypes.VARIABLE, {name: value});
    // }

    // _buildGetItemOperation() {
    //     const index = new Operation();
    //     const arrName = new Operation();
    //     return new Operation(OperationTypes.GET_ITEM, {index, arrName});
    // }

    // _buildSetItemOperation() {
    //     const index = new Operation();
    //     const arrName = new Operation();
    //     const newValue = new Operation();
    //     return new Operation(OperationTypes.SET_ITEM, {index, arrName, newValue});
    // }

    // _buildBinaryOperation(operationType) {
    //     const left = new Operation();
    //     const right = new Operation();
    //     return new Operation(operationType, {left, right});
    // }

    // _buildForLoopOperation() {
    //     const index = new Operation();
    //     const start = new Operation();
    //     const end = new Operation();
    //     const step = new Operation();
    //     return new Operation(OperationTypes.FOR_LOOP, {index, start, end, step});
    // }

    // _buildEndForLoopOperation() {
    //     return new Operation(OperationTypes.END_FOR_LOOP);
    // }

    // _buildFunctionOperation(value) {
    //     const name = value.name;
    //     const paramsCount = value.paramsCount;
    //     let params = {};

    //     for (let i = 1; i <= paramsCount; ++i) {
    //         params[`param${i}`] = new Operation();
    //     }
    //     return new Operation('function', {name, ...params});
    // }

    // _buildConditionOperation() {
    //     const param1 = new Operation();
    //     return new Operation(OperationTypes.CONDITION, {param1});
    // }

    // _buildEndConditionOperation() {
    //     return new Operation(OperationTypes.END_CONDITION);
    // }
};


export default compose(
    withAlgoBridgeService(),
)(CodeInterface);
