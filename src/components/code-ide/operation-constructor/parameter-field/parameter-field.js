import React from "react";
import Operation from "../../operation";

import './style/parameter-field.css'


const ParameterField = (props) => {
    const {index, operation, isSelected, childrenIds, setSelectedParam} = props;
    let selectClass = "";
    if (isSelected) {
        selectClass = ' selected'
    }

    return (
        <div className='parameter-field'>
            <div className={'parameter-content' + selectClass} onClick={() => setSelectedParam(index)}>
                <div>{index} :&nbsp;</div>
                <Operation {...operation} childrenIds={childrenIds} mode="parameter" />
            </div>
        </div>
    );
};

export default ParameterField;
