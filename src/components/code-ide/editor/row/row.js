import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import "./row.css"
import Number from "./number";
import Comment from "./comment";


const RowLine = (props) => {
    const {number, operations, comment} = props;

    return (
        <Container>
            <Row>
                <Col xs={1} className="line-right-border line-bottom-border row-line">
                    <Number value={number}/>
                </Col>
                <Col className="line-right-border line-bottom-border row-line">
                    <span>code</span>
                </Col>
                <Col xs={1} className="line-bottom-border row-line">
                    <Comment text={comment}/>
                </Col>
            </Row>
        </Container>
    )
};

export default RowLine;