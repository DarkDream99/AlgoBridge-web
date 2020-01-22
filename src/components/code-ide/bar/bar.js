import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import CodeBarItem from "./item";
import "./bar.css"


const CodeBar = (props) => {
    return (
        <Container className="bar">
            <Row>
                <Col>
                    <CodeBarItem
                        icon={<span>&#9769;</span>}
                        title={"add"}
                        action={() => {alert("added")}}
                    />
                </Col>

                <Col>
                    <CodeBarItem
                        icon={<span>&#10005;</span>}
                        title={"remove"}
                        action={() => {alert("removed")}}
                    />
                </Col>

                <Col>
                    <CodeBarItem
                        icon={<span>&#8657;</span>}
                        title={"move up"}
                        action={() => {alert("moved up")}}
                    />
                </Col>

                <Col>
                    <CodeBarItem
                        icon={<span>&#8659;</span>}
                        title={"move down"}
                        action={() => {alert("moved down")}}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default CodeBar;