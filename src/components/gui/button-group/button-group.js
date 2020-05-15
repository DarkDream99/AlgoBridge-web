import React from 'react';

import '../../../styles/css/button-group.css'


const ButtonGroup = ({buttons}) => {
    return (
        <div className="button-group">
            {buttons}
        </div>
    );
}


export default ButtonGroup;
