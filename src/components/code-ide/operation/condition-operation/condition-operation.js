import React from "react";
import Operation from "../operation";

import '../style/operation.css';


const ConditionOperation = (props) => {
    const {param1: condition, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                <span className="key-word">IF</span> &nbsp;(
                <Operation 
                    type={condition.type} parameter={condition.parameter} />
                )
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                <span className='key-word'>IF</span> &nbsp;(
                    &#123; {childrenIds[0]} &#125;
                )
            </div>
        );
    }

    return (
        <div className='operation'>
            {content}
        </div>
    );
};

export default ConditionOperation;
