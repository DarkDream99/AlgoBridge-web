import React from 'react';
import {Alert} from 'react-bootstrap';
import './error-indicator.css';


const ErrorIndicator = (props) => {
    let errorBody = 'Error!';
    if (props.children)
        errorBody = props.children;

    return (
        <Alert variant='danger' className='error-board'>{errorBody}</Alert>
    )
}


export default ErrorIndicator;
