import React from "react";
import "./item.css";


const InterfaceItem = (props) => {
    const {value, action} = props;

    return (
        <div onClick={() => {action()}}>{value}</div>
    );
};

export default InterfaceItem;