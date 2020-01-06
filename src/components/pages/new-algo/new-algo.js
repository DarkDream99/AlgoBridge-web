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
    state = {
        mode: 'normal',
        operations: [operation1, operation2, operation3, operation4, operation5, operation6, operation7, operation8],
        selectedRow: -1,
    };

    handleSaveRowOperation = (newOperation) => {
        const updatedOperations = [
            ...this.state.operations.slice(0, this.state.selectedRow),
            newOperation,
            ...this.state.operations.slice(this.state.selectedRow + 1)
        ];
        this.setState(
            {
                'operations': updatedOperations,
                'selectedRow': -1,
            }
        );
    };

    handleSelectRow = (index) => {
       this.setState({'selectedRow': index}); 
    };

    handleUnselectRow = () => {
        this.setState({'selectedRow': -1});
    };

    render() {
        const operationRows = this.state.operations.map((item, index) => {
            return (
                <Row key={index} onClick={() => this.handleSelectRow(index)}>
                    <RowLine number={index} operation={item} comment=""/>
                </Row>
            );
        });

        let code = "";
        if (this.state.selectedRow === -1) {
            code = (
                <>
                <Form.Group as={Row}>
                    <Container>
                        {operationRows}
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
                </>
            );
        } else {
            const selectedOperation = this.state.operations[this.state.selectedRow];
            code = (
                <OperationConstructor 
                    operation={selectedOperation}
                    handleSaveOperation={(updatedOperation) => this.handleSaveRowOperation(updatedOperation)}
                    handleClose={() => this.handleUnselectRow()}
                />
            );
        }

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

                {code}
            </Form>
        )
    }
}

export default NewAlgoPage;
