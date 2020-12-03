import React from "react"
import AssignOperation from "./assign-operation";
import NumberOperation from "./number-operation";
import VariableOperation from "./variable-operation";
import ForLoopOperation from "./for-loop-operation";
import EndForLoopOperation from "./for-loop-operation/end-for-loop-operation";
import ArrayOperation from "./array-operation";
import SumOperation from "./sum-operation";
import SubtractionOperation from "./subtraction-operation";
import MultiplicationOperation from "./multiplication-operation";
import DivisionOperation from "./division-operation";
import FunctionOperation from "./function-operation"
import ConditionOperation from "./condition-operation";
import EndConditionOperation from "./condition-operation/end-condition-operation";
import LargerOperation from "./larger-operation";
import LargerEqualOperation from "./larger-equal-operation";
import LessOperation from "./less-operation";
import LessEqualOperation from "./less-equal-operation";
import EqualOperation from "./equal-operation";
import AndLogicOperation from "./and-logic-operation";
import OrLogicOperation from "./or-logic-operation";
import GetItemOperation from "./get-item";
import SetItemOperation from "./set-item";
import operationTypes from "../../../constants/operationTypes";


const Operation = (props) => {
    const { type, parameter, childrenIds, mode, isDraggable = true, dragOverHandler, dropHandler } = props;
    let result = null;

    if (type === operationTypes.ASSIGN) {
        result = <AssignOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.LARGER) {
        result = <LargerOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.LARGE_EQUAL) {
        result = <LargerEqualOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.LESS) {
        result = <LessOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.LESS_EQUAL) {
        result = <LessEqualOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.EQUAL) {
        result = <EqualOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.AND_LOGIC) {
        result = <AndLogicOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.OR_LOGIC) {
        result = <OrLogicOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.NUMBER) {
        result = <NumberOperation {...parameter} />;
    }

    if (type === operationTypes.VARIABLE) {
        result = <VariableOperation {...parameter} />;
    }

    if (type === operationTypes.FOR_LOOP) {
        result = <ForLoopOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.END_FOR_LOOP) {
        result = <EndForLoopOperation />;
    }

    if (type === operationTypes.ARRAY) {
        result = <ArrayOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.SUM) {
        result = <SumOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.SUBSTRACTION) {
        result = <SubtractionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.MULTIPLICATION) {
        result = <MultiplicationOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.DIVISION) {
        result = <DivisionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.FUNCTION) {
        result = <FunctionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.CONDITION) {
        result = <ConditionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === operationTypes.END_CONDITION) {
        result = <EndConditionOperation />;
    }

    if (type === operationTypes.GET_ITEM) {
        result = <GetItemOperation {...parameter} childrenIds={childrenIds} mode={mode} />
    }

    if (type === operationTypes.SET_ITEM) {
        result = <SetItemOperation {...parameter} childrenIds={childrenIds} mode={mode} />
    }

    if (type === operationTypes.EMPTY && mode === 'standard') {
        if (isDraggable) {
            result = (
                <div
                    onDrop={(ev) => dropHandler(ev)}
                    onDragOver={(ev) => dragOverHandler(ev)}
                    style={{ width: '100%', height: '100%' }}
                />
            );
        }
    }
    return (
        result
    )
};

export default Operation;
