import React from 'react';
import {Button, Form, Jumbotron} from 'react-bootstrap';

import './login-page.css';


const LoginPage = () => {
    return (
        <Jumbotron className="login-block">
            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
            </Button>
            </Form>
        </Jumbotron>
    );
};

export default LoginPage;

