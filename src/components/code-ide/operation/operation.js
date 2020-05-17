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


const Operation = (props) => {
    const {type, parameter, childrenIds, mode, isDraggable=true, dragOverHandler, dropHandler} = props;
    let result = null;

    if (type === "assign") {
        result = <AssignOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "larger") {
        result = <LargerOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "larger-equal") {
        result = <LargerEqualOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "less") {
        result = <LessOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "less-equal") {
        result = <LessEqualOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "equal") {
        result = <EqualOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "and-logic") {
        result = <AndLogicOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "or-logic") {
        result = <OrLogicOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "number") {
        result = <NumberOperation {...parameter}/>;
    }

    if (type === "variable") {
        result = <VariableOperation {...parameter}/>;
    }

    if (type === "for-loop") {
        result = <ForLoopOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "end-for-loop") {
        result = <EndForLoopOperation/>;
    }

    if (type === "array") {
        result = <ArrayOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "sum") {
        result = <SumOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "subtraction") {
        result = <SubtractionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "multiplication") {
        result = <MultiplicationOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "division") {
        result = <DivisionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "function") {
        result = <FunctionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "condition") {
        result = <ConditionOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
    }

    if (type === "end-condition") {
        result = <EndConditionOperation/>;
    }

    if (type === "empty" && mode === 'standard') {
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
