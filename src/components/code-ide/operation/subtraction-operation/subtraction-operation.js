import React from "react";
import {compose} from "redux";
import withOperationBrackets from "../../../hoc/with-operation-brackets";
import Operation from "../operation";


const SubtractionOperation = (props) => {
    const {left, right, mode, childrenIds, brackets} = props;

    let content = "";
    if (mode === 'standard' || !mode) {
        content = (
            <>
            {brackets.leftStart}<Operation type={left.type} parameter={left.parameter} />{brackets.leftEnd}
                &nbsp;-&nbsp;
            {brackets.rightStart}<Operation type={right.type} parameter={right.parameter} />{brackets.rightEnd}
            </>
        );
    } else if (mode === 'parameter') {
        content = (
            <>
            {brackets.leftStart}&#123; {childrenIds[0]} &#125;{brackets.leftEnd}
                &nbsp;-&nbsp;
            {brackets.rightStart}&#123; {childrenIds[1]} &#125;{brackets.rightEnd}
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
    withOperationBrackets()
)(SubtractionOperation);
