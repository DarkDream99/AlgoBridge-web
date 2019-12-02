import React from 'react';
import {Link} from 'react-router-dom';
import './show-algo.css'
import PageTitle from "../../page-title";
import {Form, Row} from "react-bootstrap";


const ShowAlgoPage = (props) => {
    return (
        <Form style={{
            width: '60%',
            margin: 'auto',
        }}>
            <PageTitle title="Create new algorithm"/>
            <Link to={null}>Edit</Link>

            <Form.Group as={Row}>
                <Form.Label>Title of the algorithm</Form.Label>
                <Form.Control type="text" disabled />
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Short description</Form.Label>
                <Form.Control as="textarea" rows={3} disabled/>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>
                    <a href="https://web.eecs.umich.edu/~akamil/teaching/sp03/minimax.pdf">
                        Whole description
                    </a>
                </Form.Label>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Up speed</Form.Label>
                <Form.Control type="text" disabled/>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Middle speed</Form.Label>
                <Form.Control type="text" disabled/>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Middle memory</Form.Label>
                <Form.Control type="text" disabled/>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Implementation</Form.Label>
            </Form.Group>
        </Form>
    )
};

export default ShowAlgoPage;