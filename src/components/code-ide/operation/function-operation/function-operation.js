import React from "react";
import Operation from "../operation";

import '../style/operation.css';


const FunctionOperation = (props) => {
    const {name, mode, childrenIds, ...params} = props;

    let content = "";

    let paramsContent = [];
    for (let paramKey in params) {
        paramsContent.push(
            <Operation 
                key={paramKey}
                type={params[paramKey].type} 
                parameter={params[paramKey].parameter} 
            />
        )
    }

    const previewParams = paramsContent.map((item, index, array) => {
        let separator = <span>, &nbsp;</span>;
        if (index === array.length - 1) {
            separator = "";
        }
        return (
            <div key={index} style={{ display: 'flex' }}>
                {item}{separator}
            </div>
        );
    });


    if (mode === 'standard' || !mode) {
        content = (
            <>
                <span className='function-name'>{name}</span>({previewParams})
            </>
        );
    } else if (mode === 'parameter') {
        const previewChildIds = childrenIds.map((item, index, array) => {
            let separator = <span>, &nbsp;</span>;
            if (index === array.length - 1) {
                separator = "";
            }
            return (
                <div key={index} style={{display: 'flex'}}>
                    &#123; {item} &#125;{separator}
                </div>
            );
        });
        content = (
            <>
                <span className='function-name'>{name}</span>({previewChildIds})
            </>
        );
    }

    return (
        <div className='operation'>
            {content}
        </div>
    );
};


export default FunctionOperation;
