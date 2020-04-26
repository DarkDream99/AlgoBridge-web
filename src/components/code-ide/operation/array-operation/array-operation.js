import React from "react";
import Operation from "../operation";


const ArrayOperation = (props) => {
    const {items_count, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
                Array(size:  <Operation type={items_count.type} parameter={items_count.parameter} />)
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                Array(size: &#123; {childrenIds[0]} &#125;)
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
