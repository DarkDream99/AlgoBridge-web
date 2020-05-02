import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Row} from "react-bootstrap";
import PageTitle from "../../page-title";
import RowLine from "../../code-ide/editor/row";

import './show-algo.css'


const ShowAlgoPage = (props) => {
    const {title, description, implementation, output, error, handleRunImplementation} = props;

    let operations = implementation.length ? JSON.parse(implementation) : [];
    const operationRows = operations.map((operation, index) => {
        return (
            <Row key={index}>
                <RowLine
                    number={index}
                    operation={operation}
                    comment=""
                    disabled={true}
                    handleAddRow={() => null}
                    handleRemoveRow={() => null}
                    handleMoveRowUp={() => null}
                    handleMoveRowDown={() => null}
                    handleSelectRow={() => null}
                />
            </Row>
        );
    });

    return (
        <Form style={{
            width: '60%',
            margin: 'auto',
        }}>
            <PageTitle title="Show the algorithm"/>
            <Link to={null}>Edit</Link>

            <Form.Group as={Row}>
                <Form.Label>Title of the algorithm</Form.Label>
                <Form.Control type="text" value={title} disabled />
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Short description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} disabled/>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Implementation</Form.Label>
            </Form.Group>

            {operationRows}

            <Form.Group>
                <Button onClick={(event) => handleRunImplementation(event, operations)}>Run</Button>
                <Button>Visualize</Button>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Errors</Form.Label>
                <Form.Control id="code-running-error" as="textarea" rows={3} readOnly value={error} />
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label>Output</Form.Label>
                <Form.Control id="code-output" as="textarea" rows={6} readOnly value={output} />
            </Form.Group>
        </Form>
    )
};

export default ShowAlgoPage;
