import React from 'react';
import {Button, Form, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import PageTitle from '../page-title';
import './identification-body.css';


const IdentificationBody = ({title, actionText, linkObj}) => {
    return (
        <>
            <PageTitle title={title}></PageTitle>

            <Jumbotron className="identification-block">
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
                        {actionText}
                    </Button>
                </Form>

                <div className="bottom-links">
                    <pre>
                        <Link to='/'>Home</Link> | <Link to={linkObj.href}>{linkObj.label}</Link>
                    </pre>
                </div>
            </Jumbotron>
        </>
    ); 
}

IdentificationBody.propTypes = {
    title: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
    linkObj: PropTypes.object.isRequired
}

export default IdentificationBody;
