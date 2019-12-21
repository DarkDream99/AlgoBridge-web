import React, {Component} from 'react';
import './new-algo.css'
import PageTitle from "../../page-title";
import {Button, Container, Form, Row} from "react-bootstrap";
import RowLine from "../../code-ide/editor/row";
import CodeBar from "../../code-ide/bar";
import CodeInterface from "../../code-ide/interface";


const operation1 = {
    type: "assign",
    parameters: [
        {type: "variable", parameters: ['abc']},
        {type: "number", parameters: [7]},
    ]
};

const operation2 = {
    type: "assign",
    parameters: [
        {type: "variable", parameters: ['var']},
        {type: "number", parameters: [137]},
    ]
};

const operation3 = {
    type: "assign",
    parameters: [
        {type: "variable", parameters: ['var']},
        {type: "variable", parameters: ['abc']},
    ]
};

const operation4 = {
    type: "for-loop",
    parameters: [{
        index: 'i',
        start: 0,
        end: 10,
        step: 2
    }]
};

const operation5 = {
    type: "end-for-loop"
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
                    <Form.Label>Up speed</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Middle speed</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label>Middle memory</Form.Label>
                    <Form.Control type="text"/>
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
                            <RowLine number={5} operation={operation5} comment=""/>
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
            </Form>
        )
    }
}

export default NewAlgoPage;