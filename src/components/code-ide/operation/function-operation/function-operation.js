import React from "react";
import Operation from "../operation";


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
                {name}({previewParams})
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
                {name}({previewChildIds})
            </>
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


export default FunctionOperation;
