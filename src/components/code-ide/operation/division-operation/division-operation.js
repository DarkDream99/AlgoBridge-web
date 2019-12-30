import React from "react";
import Operation from "../operation";


const DivisionOperation = (props) => {
    const {left, right} = props;

    return (
        <div style={{
            display: 'flex',
        }}>
            <Operation type={left.type} parameter={left.parameter}/>
            &divide;
            <Operation type={right.type} parameter={right.parameter}/>
        </div>
    );
};

export default DivisionOperation;