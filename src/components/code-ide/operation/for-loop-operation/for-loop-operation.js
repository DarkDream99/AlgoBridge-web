import React from "react";
import Operation from "../operation";


const ForLoopOperation = (props) => {
    const {index, start, end, step, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
                for 
                &nbsp;
                <Operation type={index.type} parameter={index.parameter} />
                &nbsp; from &nbsp; 
                <Operation type={start.type} parameter={start.parameter} />
                &nbsp; to &nbsp;
                <Operation type={end.type} parameter={end.parameter} />
                &nbsp; with step= 
                <Operation type={step.type} parameter={step.parameter} />
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                for &#123; {childrenIds[0]} &#125;: 
                    &#123; {childrenIds[1]} &#125;..
                    &#123; {childrenIds[2]} &#125;, 
                step=&#123; {childrenIds[3]} &#125;    
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

export default ForLoopOperation;
