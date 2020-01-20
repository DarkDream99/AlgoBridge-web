import React from "react";
import Operation from "../operation";


const SumOperation = (props) => {
    const {left, right, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                <Operation type={left.type} parameter={left.parameter} />
                &nbsp;+&nbsp;
                <Operation type={right.type} parameter={right.parameter} />
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                &#123; {childrenIds[0]} &#125;
                &nbsp;+&nbsp;
                &#123; {childrenIds[1]} &#125;
            </div>
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

export default SumOperation;
