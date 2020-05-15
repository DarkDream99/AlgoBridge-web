import React from 'react';


const Button = ({children, action=() => {}, classes=""}) => {
    const handleClick = (event) => {
        event.preventDefault();
        action();
    }

    return (
        <button className={classes} onClick={(event) => handleClick(event)}>
            {children}
        </button>
    );
};


export default Button;
