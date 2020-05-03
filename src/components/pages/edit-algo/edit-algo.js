import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, Row} from "react-bootstrap";

import OperationConstructor from "../../code-ide/operation-constructor";
import PageTitle from "../../page-title";
import RowLine from "../../code-ide/editor/row";


const EditAlgoPage = (props) => {
    const {
        title, description, operations, funcs, selectedRow, output, error,
        handleRunImplementation, handleChangeTitle, handleChangeDescription,
        handleAddRow, handleRemoveRow, handleMoveRowUp, handleMoveRowDown,
        handleSelectRow, handleUnselectRow, handleSaveRowOperation,
        handleSaveAlgo, handleDeleteAlgo,
    } = props;

    const operationRows = operations.map((operation, index) => {
        return (
            <Row key={index}>
                <RowLine
                    number={index}
                    operation={operation}
                    comment=""
                    handleAddRow={() => handleAddRow(index)}
                    handleRemoveRow={() => handleRemoveRow(index)}
                    handleMoveRowUp={() => handleMoveRowUp(index)}
                    handleMoveRowDown={() => handleMoveRowDown(index)}
                    handleSelectRow={() => handleSelectRow(index)}
                />
            </Row>
        );
    });

    let code = "";
    if (selectedRow === -1) {
        code = (
            <>
                <Form.Group as={Row}>
                    <Container>
                        {operationRows}
                    </Container>
                </Form.Group>

                <Form.Group>
                    <Button variant="success" onClick={() => handleSaveAlgo()}>Save</Button>
                    <Button onClick={(event) => handleRunImplementation(operations)}>Run</Button>
                    <Button>Visualize</Button>
                    <Button variant="danger" onClick={(event) => handleDeleteAlgo()}>Delete</Button>
                </Form.Group>
            </>
        );
    } else {
        const selectedOperation = operations[selectedRow];
        code = (
            <OperationConstructor
                funcs={funcs}
                operation={selectedOperation}
                handleSaveOperation={(updatedOperation) => handleSaveRowOperation(updatedOperation)}
                handleClose={() => handleUnselectRow(selectedRow)}
            />
        );
    }

    return (
        <Form style={{
            width: '60%',
            margin: 'auto',
        }}>
            <PageTitle title="Edit the algorithm"/>

            <Form.Group as={Row}>
                <Form.Label>Title of the algorithm</Form.Label>
                <Form.Control type="text" value={title} onChange={(event) => handleChangeTitle(event.target.value)} />
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Short description</Form.Label>
                <Form.Control as="textarea" rows={3} value={description} onChange={(event) => handleChangeDescription(event.target.value)} />
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label>Implementation</Form.Label>
            </Form.Group>

            {code}

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

export default EditAlgoPage;
