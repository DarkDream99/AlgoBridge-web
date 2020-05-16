import React from "react";
import Operation from "../operation";

import '../style/operation.css';


const ForLoopOperation = (props) => {
    const {index, start, end, step, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                <span className='key-word'>FOR</span>
                &nbsp; &nbsp;
                <Operation type={index.type} parameter={index.parameter} />
                &nbsp; &nbsp;
                <span className='key-word'>FROM</span>
                &nbsp; &nbsp;
                <Operation type={start.type} parameter={start.parameter} />
                &nbsp; &nbsp;
                <span className='key-word'>TO</span>
                &nbsp; &nbsp;
                <Operation type={end.type} parameter={end.parameter} />
                &nbsp; &nbsp;
                <span className='key-word'>WITH</span>
                &nbsp; &nbsp;
                STEP =&nbsp;
                <Operation type={step.type} parameter={step.parameter} />
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                <span className='key-word'>FOR</span>
                &nbsp; &#123; {childrenIds[0]} &#125; &nbsp;
                <span className='key-word'>FROM</span>
                &nbsp; &#123; {childrenIds[1]} &#125; &nbsp;
                <span className='key-word'>TO</span>
                &nbsp; &#123; {childrenIds[2]} &#125; &nbsp;
                <span className='key-word'>WITH</span>
                &nbsp; STEP=&#123; {childrenIds[3]} &#125; &nbsp;
            </div>
        );
    }
    return (
        <div className='operation'>
            {content}
        </div>
    );
};

export default ForLoopOperation;
