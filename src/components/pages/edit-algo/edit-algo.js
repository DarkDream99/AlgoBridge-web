import React from 'react';
import {Container, Form, Row} from "react-bootstrap";

import Button from "../../gui/button";
import ButtonGroup from "../../gui/button-group";
import {isBlockOperation, isEndBlockOperation} from "../../code-ide/operation";
import OperationConstructor from "../../code-ide/operation-constructor";
import PageTitle from "../../page-title";
import RowLine from "../../code-ide/editor/row";


const EditAlgoPage = (props) => {
    const {
        title, description, operations, funcs, selectedRow, output, error,
        handleRunImplementation, handleChangeTitle, handleChangeDescription,
        handleAddRow, handleRemoveRow, handleMoveRowUp, handleMoveRowDown,
        handleSelectRow, handleUnselectRow, handleSaveRowOperation,
        handleChangeRowOperationFromDrag,
        handleSaveAlgo, handleDeleteAlgo,
    } = props;

    let nest = 0;
    const operationRows = operations.map((operation, index) => {
        let tartget_nest = nest;
        if (isBlockOperation(operation))
            nest += 1;
        if (isEndBlockOperation(operation)) {
            nest -= 1;
            tartget_nest = nest;
        }
        return (
            <Row key={index}>
                <RowLine
                    number={index}
                    operation={operation}
                    comment=""
                    nest={tartget_nest}
                    handleAddRow={() => handleAddRow(index)}
                    handleRemoveRow={() => handleRemoveRow(index)}
                    handleMoveRowUp={() => handleMoveRowUp(index)}
                    handleMoveRowDown={() => handleMoveRowDown(index)}
                    handleSelectRow={() => handleSelectRow(index)}
                    handleChangeRowOperationFromDrag={
                        (newOperation, indexFrom, indexTo) => handleChangeRowOperationFromDrag(newOperation, indexFrom, indexTo)
                    }
                />
            </Row>
        );
    });

    let code = "";
    const manageAlgoButtonsGroup = (
        <ButtonGroup buttons={[
            <Button action={() => handleSaveAlgo()} classes="success">Save</Button>,
            <Button action={() => handleRunImplementation(operations)}>Run</Button>,
            <Button action={() => handleDeleteAlgo()} classes="danger">Delete</Button>
        ]} /> 
    );
    if (selectedRow === -1) {
        code = (
            <>
                <Form.Group as={Row}>
                    <Container>
                        {operationRows}
                    </Container>
                </Form.Group>

                {manageAlgoButtonsGroup}
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
            <PageTitle>
                Edit the algorithm
            </PageTitle>

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
