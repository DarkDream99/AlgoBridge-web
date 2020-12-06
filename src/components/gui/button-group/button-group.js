import React from 'react';

import './button-group.scss'


const ButtonGroup = ({ className, buttons}) => {
    return (
        <div className={className ? className : "button-group"}>
            {buttons}
        </div>
    );
}


export default ButtonGroup;
