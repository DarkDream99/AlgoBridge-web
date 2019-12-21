import React from "react"
import AssignOperation from "./assign-operation";
import NumberOperation from "./number-operation";
import VariableOperation from "./variable-operation";
import ForLoopOperation from "./for-loop-operation";
import EndForLoopOperation from "./for-loop-operation/end-for-loop-operation";


const Operation = (props) => {
    const {type, parameters} = props;
    let result = null;

    if (type === "assign") {
        result = <AssignOperation left={parameters[0]} right={parameters[1]}/>;
    }

    if (type === "number") {
        result = <NumberOperation val={parameters[0]}/>;
    }

    if (type === "variable") {
        result = <VariableOperation name={parameters[0]}/>
    }

    if (type === "for-loop") {
        result = <ForLoopOperation {...parameters[0]}/>
    }

    if (type === "end-for-loop") {
        result = <EndForLoopOperation/>
    }

    return (
        result
    )
};

export default Operation;