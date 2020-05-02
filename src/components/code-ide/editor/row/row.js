import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import "./row.css"
import Number from "./number";
import Operation from "../../operation";


const RowLine = (props) => {
    const {
        number, operation, nest, comment, handleAddRow, handleSelectRow,
        handleRemoveRow, handleMoveRowUp, handleMoveRowDown, disabled
    } = props;

    let spaces = [];
    if (nest) {
        for (let i = 0; i < 4 * nest; ++i) {
            spaces.push(<span key={i}>&#160;</span>);
        }
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
                    {spaces}<Operation {...operation} />
                </Col>
                {navButtons}
            </Row>
        </Container>
    )
};

export default RowLine;
