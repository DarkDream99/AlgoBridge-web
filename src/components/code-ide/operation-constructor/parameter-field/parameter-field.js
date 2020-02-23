import React from "react";
import Operation from "../../operation";


const ParameterField = (props) => {
    const {index, operation, isSelected, childrenIds, setSelectedParam} = props;
    let selectedMark = "";
    if (isSelected) {
        selectedMark = <div>***</div>
    }

    return (
        <div style={{display: 'flex'}} onClick={() => setSelectedParam(index)}>
            <div>{index} :</div>
            <Operation {...operation} childrenIds={childrenIds} mode="parameter" />
            {selectedMark}
        </div>
    );
};

export default ParameterField;
