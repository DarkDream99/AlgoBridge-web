import React, {useState} from 'react';
import {Button, Form, Jumbotron} from 'react-bootstrap';
import PropTypes from 'prop-types';


import './identification-body.css';


const IdentificationBody = ({actionText, action, loader}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Jumbotron className="identification-block">
            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)}
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
                        action(email, password);
                    }
                }>
                    {actionText}
                </Button>
            </Form>

            <div style={{textAlign: 'center'}}>
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
