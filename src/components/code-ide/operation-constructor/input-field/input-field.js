import React, {Component} from "react";
import {Button, Modal} from "react-bootstrap";


class InputField extends Component {
    state = {
        inputRef: React.createRef(),
    };

    _handleSave() {
        const {handleSave} = this.props;
        handleSave(this.state.inputRef.current.value.trim());
    };

    render() {
        const {show, handleClose, label, error} = this.props;
        let errorField = "";
        if (error)
            errorField = <div style={{color: 'red'}}>{error}</div>;

        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Input field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{label}</div>
                    {errorField}
                    <input type="text" ref={this.state.inputRef} />
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

export default InputField;