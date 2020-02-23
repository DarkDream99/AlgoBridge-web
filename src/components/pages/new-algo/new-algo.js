import React, {Component} from 'react';
import './new-algo.css'
import PageTitle from "../../page-title";
import {Button, Container, Form, Row} from "react-bootstrap";
import RowLine from "../../code-ide/editor/row";
import OperationConstructor from "../../code-ide/operation-constructor";


const funcs = [
    {
        name: 'abs',
        paramsCount: 1,
        description: '',
    }, {
        name: 'divmod',
        paramsCount: 3,
        description: 
`divmode(num, mod) -> number

num - context number
mod - module
num % mod`
    }
];

// const operation1 = {
//     type: "assign",
//     parameter: {
//         left:  {type: "variable", parameter: {name: 'abc'}},
//         right: {type: "number", parameter: {val: 7}},
//     }
// };

// const operation2 = {
//     type: "assign",
//     parameter: {
//         left: {type: "variable", parameter: {name: 'var'}},
//         right: {type: "number", parameter: {val: 137}},
//     }
// };

// const operation3 = {
//     type: "assign",
//     parameter: {
//         left: {type: "variable", parameter: {name: 'var'}},
//         right: {type: "variable", parameter: {name: 'abc'}},
//     }
// };

// const operation4 = {
//     type: "for-loop",
//     parameter: {
//         index: {type: "variable", parameter: {name: 'i'}},
//         start: {type: "number", parameter: {val: 0}},
//         end: {type: "number", parameter: {val: 10}},
//         step: {type: "number", parameter: {val: 2}}
//     }
// };

// const operation5 = {
//     type: "end-for-loop",
//     parameter: {}
// };

// const operation6 = {
//     type: "assign",
//     parameter: {
//         left: {type: 'variable', parameter: {name: 'var'}},
//         right: {type: 'array', parameter: {values: [5, 6, -3, 'abc']}},
//     }
// };

// const operation7 = {
//     type: "function",
//     parameter: {
//         name: "abc",
//         param1: {type: 'variable', parameter: {name: 'var'}},
//         param2: {type: 'number', parameter: {val: -30}},
//         param3: {type: 'variable', parameter: {name: 'boc'}},
//     }
// };

// const operation8 = {
//     type: "assign",
//     parameter: {
//         left: {type: 'variable', parameter: {name: 'var'}},
//         right: {
//             type: 'multiplication',
//             parameter: {
//                 left: {type: 'number', parameter: {val: 5}},
//                 right: {type: 'number', parameter: {val: 8}}
//             }
//         }
//     }
// };

class NewAlgoPage extends Component {
    state = {
        mode: 'normal',
        operations: [{type: 'empty', parameter: {}}],
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

    handleAddRow = (index) => {
        const emptyOperation = {type: 'empty', parameter: {}};
        const updatedOperations = [
            ...this.state.operations.slice(0, index+1),
            emptyOperation,
            ...this.state.operations.slice(index+1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    };

    handleRemoveRow = (index) => {
        if (this.state.operations.length === 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleMoveRowUp = (index) => {
        if (index === 0)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index-1),
            this.state.operations[index],
            this.state.operations[index-1],
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleMoveRowDown = (index) => {
        if (index === this.state.operations.length - 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            this.state.operations[index+1],
            this.state.operations[index],
            ...this.state.operations.slice(index + 2)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    render() {
        const operationRows = this.state.operations.map((item, index) => {
            return (
                <Row key={index}>
                    <RowLine 
                        number={index} 
                        operation={item} 
                        comment=""
                        handleAddRow={() => this.handleAddRow(index)}
                        handleRemoveRow={() => this.handleRemoveRow(index)}
                        handleMoveRowUp={() => this.handleMoveRowUp(index)}
                        handleMoveRowDown={() => this.handleMoveRowDown(index)}
                        handleSelectRow={() => this.handleSelectRow(index)}
                    />
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
                            console.log(JSON.stringify(this.state.operations))
                        }
                    }>Create</Button>
                    <Button>Run</Button>
                    <Button>Visualize</Button>
                </Form.Group>
                </>
            );
        } else {
            const selectedOperation = JSON.parse(JSON.stringify(this.state.operations[this.state.selectedRow]));
            code = (
                <OperationConstructor 
                    funcs={funcs}
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
