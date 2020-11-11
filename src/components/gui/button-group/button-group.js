import React from 'react';

import './button-group.scss'


const ButtonGroup = ({buttons}) => {
    return (
        <div className="button-group">
            {buttons}
        </div>
    );
}


export default ButtonGroup;
