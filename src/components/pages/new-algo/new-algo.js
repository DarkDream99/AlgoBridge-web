import React, {Component} from 'react';
import './new-algo.css'
import PageTitle from "../../page-title";
import {Button, Container, Form, Row} from "react-bootstrap";
import RowLine from "../../code-ide/editor/row";
import CodeBar from "../../code-ide/bar";


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

                 <Form.Group as={Row} style={{
                width: '100% !important',
            }}>
                     <CodeBar/>
                    <Container>
                        <Row>
                            <RowLine number={1} operations={null} comment="Yarik"/>
                        </Row>
                        <Row>
                            <RowLine number={2} operations={null} comment="Zaebok"/>
                        </Row>
                         <Row>
                            <RowLine number={3} operations={null} comment="Zaebok"/>
                        </Row>
                         <Row>
                            <RowLine number={4} operations={null} comment="Zaebok"/>
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
                </Form.Group>
            </Form>
        )
    }
}

export default NewAlgoPage;