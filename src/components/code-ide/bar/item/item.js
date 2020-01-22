import React from "react";
import "./item.css";


const CodeBarItem = (props) => {
    const {icon, title, action} = props;

    return (
        <div title={title} onClick={() => {action()}}  className="bar-item">
            {icon}
        </div>
    );
};

export default CodeBarItem;