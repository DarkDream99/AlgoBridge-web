import React from "react";
import Operation from "../operation";


const SumOperation = (props) => {
    const {left, right} = props;

    return (
        <div style={{
            display: 'flex',
        }}>
            <Operation type={left.type} parameter={left.parameter}/>
            +
            <Operation type={right.type} parameter={right.parameter}/>
        </div>
    );
};

export default SumOperation;