import React, {Component} from "react";
import {Button, Dropdown, Modal} from "react-bootstrap";


class FunctionSelector extends Component {
    state = {
        selectedFunction: null,
    };

    _handleSave() {
        const {handleSave} = this.props;
        handleSave(this.state.selectedFunction);
    }

    handleSelectFunction(funcIndex) {
        const {funcs} = this.props;
        const selectedFunc = funcs[funcIndex];

        this.setState({selectedFunction: selectedFunc});
    }
    
    render() {
        const {funcs, label, error, show, handleClose} = this.props;
        let errorField = "";
        if (error)
            errorField = <div style={{color: 'red'}}>{error}</div>;
        
        const funcItems = funcs.map((item, index) => {
            return (
                <Dropdown.Item
                    key={item.name}
                    onClick={() => this.handleSelectFunction(index)}
                >
                    {item.name}
                </Dropdown.Item>
            )
        });

        const funcsPreview = (
            <Dropdown>
                <Dropdown.Toggle variant="info">
                    Available functions 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {funcItems}
                </Dropdown.Menu>
            </Dropdown>
        );

        let funcPreview = "";
        if (this.state.selectedFunction)
            funcPreview = (
                <div>
                    <div>Selected function:</div>
                    <div>{this.state.selectedFunction.name}</div>
                    <div>Description:</div>
                    <textarea rows={5} cols={40} readOnly 
                        value={this.state.selectedFunction.description}/>
                </div>
            );

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{label}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorField}
                    {funcsPreview}        
                    <hr />
                    {funcPreview}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => this._handleSave()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default FunctionSelector;
