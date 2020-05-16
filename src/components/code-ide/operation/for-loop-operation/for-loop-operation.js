import React from "react";
import Operation from "../operation";


const ForLoopOperation = (props) => {
    const {index, start, end, step, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                FOR 
                &nbsp;
                <Operation type={index.type} parameter={index.parameter} />
                &nbsp; FROM &nbsp; 
                <Operation type={start.type} parameter={start.parameter} />
                &nbsp; TO &nbsp;
                <Operation type={end.type} parameter={end.parameter} />
                &nbsp; WITH STEP= 
                <Operation type={step.type} parameter={step.parameter} />
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                FOR &#123; {childrenIds[0]} &#125; FROM 
                    &#123; {childrenIds[1]} &#125; TO
                    &#123; {childrenIds[2]} &#125; WITH 
                STEP=&#123; {childrenIds[3]} &#125; 
            </div>
        );
    }
    return (
        <div style={{
            display: 'inline-flex',
        }}>
            {content}
        </div>
    );
};

export default ForLoopOperation;
