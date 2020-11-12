import React from "react";
import {compose} from "redux";
import Operation from "../operation";


const SetItemOperation = (props) => {
    const {arrName, index, newValue, mode, childrenIds} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
                <Operation type={arrName.type} parameter={arrName.parameter}/>
                        [ &nbsp;
                <Operation type={index.type} parameter={index.parameter}/>
                        &nbsp; ] =&nbsp;
                <Operation type={newValue.type} parameter={newValue.parameter} />
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <>
            &#123; {childrenIds[0]} &#125;
                [
            &#123; {childrenIds[1]} &#125;
                ] =
            &#123; {childrenIds[2]} &#125;
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
)(SetItemOperation);
