import React from 'react';
import {Button, Form, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PageTitle from '../../page-title';

import './signup-page.css';


const SignupPage = () => {
    return (
        <>
            <PageTitle title="Signup" ></PageTitle>

            <Jumbotron className="signup-block">
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Signup
                </Button>
                </Form>

                <div className="bottom-links">
                    <pre>
                        <Link to='/'>Home</Link> | <Link to='/login'>Login</Link>
                    </pre>
                </div>
            </Jumbotron>
        </>
    );
}

export default SignupPage;
