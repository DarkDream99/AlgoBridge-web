import React from "react";
import GroupInterfaceItem from "./group-item";
import "./interface.css";


const CodeInterface = (props) => {
    const {func, oper} = props;

    return (
        <>
            <GroupInterfaceItem
                title={func.title}
                values={func.values}
                actions={func.actions}
            />

            <GroupInterfaceItem
                title={oper.title}
                values={oper.values}
                actions={oper.actions}
            />
        </>
    );
};

export default CodeInterface;