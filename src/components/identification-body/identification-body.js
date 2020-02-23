import React, {useState} from 'react';
import {Button, Form, Jumbotron} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ErrorIndicator from '../error-indicator';

import './identification-body.css';


const IdentificationBody = ({actionText, action, loader, errorMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let errorBoard = null;
    if (errorMessage)
        errorBoard = (
            <ErrorIndicator>
                <div>{errorMessage}</div>
            </ErrorIndicator>
        );

    return (
        <Jumbotron className="identification-block">
            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="Enter username" 
                        value={username} 
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={
                    (event) => {
                        event.preventDefault();
                        action(username, password);
                    }
                }>
                    {actionText}
                </Button>
            </Form>

            <div style={{textAlign: 'center'}}>
                {errorBoard}
                {loader}
            </div>
        </Jumbotron>
    );
};

IdentificationBody.propTypes = {
    actionText: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    loader: PropTypes.element,
};

export default IdentificationBody;
