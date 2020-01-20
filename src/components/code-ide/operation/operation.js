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


const Operation = (props) => {
    const {type, parameter, childrenIds, mode} = props;
    let result = null;

    if (type === "assign") {
        result = <AssignOperation {...parameter} childrenIds={childrenIds} mode={mode} />;
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
        result = <ArrayOperation {...parameter} />;
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

    return (
        result
    )
};

export default Operation;
