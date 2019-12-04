import React from "react";
import "./number.css";


const Number = (props) => {
    const {value} = props;

    return (
        <div>
            <span>{value}</span>
        </div>
    );
};

export default Number;