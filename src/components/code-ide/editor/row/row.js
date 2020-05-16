import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import Number from "./number";
import Operation from "../../operation";

import "./row.css"


const RowLine = (props) => {
    const {
        number, operation, nest=0, comment, handleAddRow, handleSelectRow,
        handleRemoveRow, handleMoveRowUp, handleMoveRowDown, disabled,
        handleChangeRowOperationFromDrag
    } = props;

    let spaces = [];
    for (let i = 0; i < 5 * nest; ++i) {
        spaces.push(<span key={i}>&#160;</span>);
    }

    let navButtons = null;
    if (!disabled) {
        navButtons = (
            <Col xs={1} className="line-bottom-border row-line">
                <ButtonGroup>
                    <Button onClick={() => handleAddRow()}>&#9769;</Button>
                    <Button onClick={() => handleRemoveRow()}>&#10005;</Button>
                    <Button onClick={() => handleMoveRowUp()}>&#8657;</Button>
                    <Button onClick={() => handleMoveRowDown()}>&#8659;</Button>
                </ButtonGroup>
            </Col>
        );
    }

    const dragStartHandler = (ev) => {
        ev.dataTransfer.setData('text/plain', JSON.stringify({operation: operation, startRow: number}));
    }

    const dragOverHandler = (ev) => {
        ev.preventDefault();
        ev.dataTransfer.dropEffect = 'move';
    }

    const dropHandler = (ev) => {
        ev.preventDefault();
        const data = JSON.parse(ev.dataTransfer.getData('text/plain'));
        const newOperation = data['operation'];
        const startRow = data['startRow'];
        handleChangeRowOperationFromDrag(newOperation, startRow, number);
    }

    let operationRow = null;
    if (!disabled) {
        operationRow = (
            <div draggable='true' style={{ width: '100%', display: 'flex' }} onDragStart={(ev) => dragStartHandler(ev)}>
                {spaces}
                <Operation
                    {...operation}
                    dragOverHandler={(ev) => dragOverHandler(ev)}
                    dropHandler={(ev => dropHandler(ev))}
                    mode='standard'
                />
            </div>
        );
    } else {
        operationRow = (
            <div>
                {spaces}<Operation {...operation} />
            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col xs={1} className="line-right-border line-bottom-border row-line">
                    <Number value={number}/>
                </Col>
                <Col className="line-right-border line-bottom-border row-line"
                    style={{display: 'flex'}}
                    onClick={() => handleSelectRow()}
                >
                    {operationRow}
                </Col>
                {navButtons}
            </Row>
        </Container>
    )
};

export default RowLine;
