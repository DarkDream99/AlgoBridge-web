import React from "react";
import Operation from "../operation";

import '../style/operation.css';


const ArrayOperation = (props) => {
    const {items_count, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                <span className='structure-name'>Array</span>(size: &nbsp; <Operation type={items_count.type} parameter={items_count.parameter} />)
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                <span className='structure-name'>Array</span>(size: &#123; {childrenIds[0]} &#125;)
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

export default ArrayOperation;
