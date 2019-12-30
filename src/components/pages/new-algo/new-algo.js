import React, {Component} from 'react';
import './new-algo.css'
import PageTitle from "../../page-title";
import {Button, Container, Form, Row} from "react-bootstrap";
import RowLine from "../../code-ide/editor/row";
import OperationConstructor from "../../code-ide/operation-constructor";


const operation1 = {
    type: "assign",
    parameter: {
        left:  {type: "variable", parameter: {name: 'abc'}},
        right: {type: "number", parameter: {val: 7}},
    }
};

const operation2 = {
    type: "assign",
    parameter: {
        left: {type: "variable", parameter: {name: 'var'}},
        right: {type: "number", parameter: {val: 137}},
    }
};

const operation3 = {
    type: "assign",
    parameter: {
        left: {type: "variable", parameter: {name: 'var'}},
        right: {type: "variable", parameter: {name: 'abc'}},
    }
};

const operation4 = {
    type: "for-loop",
    parameter: {
        index: 'i',
        start: 0,
        end: 10,
        step: 2
    }
};

const operation5 = {
    type: "end-for-loop"

};

const operation6 = {
    type: "assign",
    parameter: {
        left: {type: 'variable', parameter: {name: 'var'}},
        right: {type: 'array', parameter: {values: [5, 6, -3, 'abc']}},
    }
};

const operation7 = {
    type: "multiplication",
    parameter: {
        left: {type: 'number', parameter: {val: 7}},
        right: {type: 'number', parameter: {val: 12}}
    }
};

const operation8 = {
    type: "assign",
    parameter: {
        left: {type: 'variable', parameter: {name: 'var'}},
        right: {
            type: 'multiplication',
            parameter: {
                left: {type: 'number', parameter: {val: 5}},
                right: {type: 'number', parameter: {val: 8}}
            }
        }
    }
};

class NewAlgoPage extends Component {

    render() {
        return (
            <Form style={{
                width: '60%',
                margin: 'auto',
            }}>
                <PageTitle title="Create new algorithm"/>

                <Form.Group as={Row}>
                    <Form.Label>Title of the algorithm</Form.Label>
                    <Form.Control type="text" placeholder="Enter algorithm's title" />
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Short description</Form.Label>
                    <Form.Control as="textarea" rows={3}/>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Whole description</Form.Label>
                    <Form.Control type="file" accept=".pdf"/>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Implementation</Form.Label>
                </Form.Group>

                 <Form.Group as={Row}>
                    <Container>
                        <Row>
                            <RowLine number={1} operation={operation1} comment=""/>
                        </Row>
                        <Row>
                            <RowLine number={2} operation={operation2} comment=""/>
                        </Row>
                         <Row>
                            <RowLine number={3} operation={operation3} comment=""/>
                        </Row>
                         <Row>
                            <RowLine number={4} operation={operation4} comment=""/>
                        </Row>
                        <Row>
                            <RowLine number={5} operation={operation6} nest={1} comment=""/>
                        </Row>
                        <Row>
                            <RowLine number={6} operation={operation7} nest={1} comment=""/>
                        </Row>
                        <Row>
                            <RowLine number={7} operation={operation5} comment=""/>
                        </Row>
                    </Container>
                </Form.Group>

                <Form.Group>
                    <Button variant="success" type="submit" onClick={
                        (event) => {
                            event.preventDefault();
                            console.log("create new algorithm", event);
                        }
                    }>Create</Button>
                    <Button>Run</Button>
                    <Button>Visualize</Button>
                </Form.Group>

                <OperationConstructor operation={operation8}/>
            </Form>
        )
    }
}

export default NewAlgoPage;