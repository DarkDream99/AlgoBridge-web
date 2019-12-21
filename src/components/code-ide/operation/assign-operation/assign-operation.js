import React from "react";
import Operation from "../operation";


const AssignOperation = (props) => {
    const {left, right} = props;

    return (
        <div style={{
            display: 'flex',
        }}>
            <Operation type={left.type} parameters={left.parameters} />
            &larr;
            <Operation type={right.type} parameters={right.parameters} />
        </div>
    );
};

export default AssignOperation;