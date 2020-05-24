import React from "react";
import {compose} from "redux";
import withOperationBrackets from "../../../hoc/with-operation-brackets";
import Operation from "../operation";


const SumOperation = (props) => {
    const {left, right, mode, childrenIds, brackets} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <div style={{ display: 'flex' }}>
            {brackets.leftStart}<Operation type={left.type} parameter={left.parameter} />{brackets.leftEnd}
                &nbsp;+&nbsp;
            {brackets.rightStart}<Operation type={right.type} parameter={right.parameter} />{brackets.rightEnd}
            </div>
        );
    } else if (mode === 'parameter') {
        content = (
            <div>
                {brackets.leftStart}&#123; {childrenIds[0]} &#125;{brackets.leftEnd}
                &nbsp;+&nbsp;
                {brackets.rightStart}&#123; {childrenIds[1]} &#125;{brackets.rightEnd}
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

export default compose(
    withOperationBrackets(),
)(SumOperation);
