import React from 'react';

import './style/button-group.css'


const ButtonGroup = ({buttons}) => {
    return (
        <div className="button-group">
            {buttons}
        </div>
    );
}


export default ButtonGroup;
