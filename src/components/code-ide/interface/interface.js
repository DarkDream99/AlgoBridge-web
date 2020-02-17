import React from "react";
import GroupInterfaceItem from "./group-item";
import "./interface.css";


const CodeInterface = (props) => {
    const {groups} = props;
    const content = groups.map((group) => (
        <GroupInterfaceItem
            key={group.title}
            title={group.title}
            values={group.values}
            actions={group.actions}
        />
    ));

    return (
        <div style={{display: 'flex'}}>
            {content}
        </div>
    );
};

export default CodeInterface;