import React from "react";
import Operation from "../operation";

import '../style/operation.css'


const AssignOperation = (props) => {
    const {left, right, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
                <Operation type={left.type} parameter={left.parameter} />
                &nbsp;&larr;&nbsp;
                <Operation type={right.type} parameter={right.parameter} />
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <>
                &#123; {childrenIds[0]} &#125;
                &nbsp;&larr;&nbsp;
                &#123; {childrenIds[1]} &#125;
            </>
        );
    }

    return (
        <div className='operation'>
            {content}
        </div>
    );
};

export default AssignOperation;
