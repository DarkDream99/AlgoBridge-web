import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import "./row.css"
import Number from "./number";
import Operation from "../../operation";


const RowLine = (props) => {
    const {number, operation, comment} = props;

    return (
        <Container>
            <Row>
                <Col xs={1} className="line-right-border line-bottom-border row-line">
                    <Number value={number}/>
                </Col>
                <Col className="line-right-border line-bottom-border row-line">
                    <Operation type={operation.type} parameters={operation.parameters} />
                </Col>
                <Col xs={1} className="line-bottom-border row-line">
                    <ButtonGroup>
                        <Button>&#9769;</Button>
                        <Button>&#10005;</Button>
                        <Button>&#8657;</Button>
                        <Button>&#8659;</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    )
};

export default RowLine;