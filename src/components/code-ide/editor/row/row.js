import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTrash, faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons"
import Number from "./number";
import Operation from "../../operation";

import "./row.css"
import "./style/operation-row.css"


const RowLine = (props) => {
    const {
        number, operation, nest=0, handleAddRow, handleSelectRow,
        handleRemoveRow, handleMoveRowUp, handleMoveRowDown, readOnly,
        handleChangeRowOperationFromDrag
    } = props;

    let spaces = [];
    for (let i = 0; i < 5 * nest; ++i) {
        spaces.push(<span key={i}>&#160;</span>);
    }

    let navButtons = null;
    if (!readOnly) {
        navButtons = (
            <Col xs={1} style={{ display: 'flex', alignItems: 'center' }}>
                <ButtonGroup>
                    <Button onClick={() => handleAddRow()}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button onClick={() => handleMoveRowUp()}>
                        <FontAwesomeIcon icon={faArrowUp} />
                    </Button>
                    <Button onClick={() => handleMoveRowDown()}>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </Button>
                    <Button onClick={() => handleRemoveRow()}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
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
    if (!readOnly) {
        operationRow = (
            <div draggable='true' className="operation-row-content" onDragStart={(ev) => dragStartHandler(ev)}>
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
            <div className="operation-row-content">
                {spaces}<Operation {...operation} />
            </div>
        )
    }

    return (
        <Container>
            <Row className="operation-row">
                <Col xs={1} style={{ display: 'flex', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px'  }}>
                    <Number value={number}/>
                </Col>
                <Col
                    style={{display: 'flex'}}
                    onClick={() => !readOnly && handleSelectRow()}
                >
                    {operationRow}
                </Col>
                {navButtons}
            </Row>
        </Container>
    )
};

export default RowLine;
