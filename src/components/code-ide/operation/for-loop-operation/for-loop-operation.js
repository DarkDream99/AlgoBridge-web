import React from "react";


const ForLoopOperation = (props) => {
    const {index, start, end, step} = props;

    return (
        <div>
            for {index}: {start}..{end}, step={step}
        </div>
    );
};

export default ForLoopOperation;