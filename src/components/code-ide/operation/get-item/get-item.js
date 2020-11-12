import React from "react";
import {compose} from "redux";
import Operation from "../operation";


const GetItemOperation = (props) => {
    const {arrName, index, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
            <Operation type={arrName.type} parameter={arrName.parameter}/>
                    [ &nbsp;
            <Operation type={index.type} parameter={index.parameter}/>
                    &nbsp; ]
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <>
            &#123; {childrenIds[0]} &#125;
                [
            &#123; {childrenIds[1]} &#125;
                ]
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

export default compose(
    // withOperationBrackets()
)(GetItemOperation);
