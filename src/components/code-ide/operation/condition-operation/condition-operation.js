import React from "react";
import Operation from "../operation";


const ConditionOperation = (props) => {
    const {param1: condition, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                IF &nbsp;(
                <Operation 
                    type={condition.type} parameter={condition.parameter} />
                )
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                IF &nbsp;(
                    &#123; {childrenIds[0]} &#125;
                )
            </div>
        );
    }

    return (
        <div style={{ display: 'inline-flex' }}>
            {content}
        </div>
    );
};

export default ConditionOperation;
