import React from "react";
import Operation from "../operation";


const AssignOperation = (props) => {
    const {left, right, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
                <Operation type={left.type} parameter={left.parameter} />
                &larr;
                <Operation type={right.type} parameter={right.parameter} />
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <>
                &#123; {childrenIds[0]} &#125;
                &larr;
                &#123; {childrenIds[1]} &#125;
            </>
        );
    }

    return (
        <div style={{
            display: 'flex',
        }}>
            {content}
        </div>
    );
};

export default AssignOperation;