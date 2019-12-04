import React, {useState} from "react"
import {Button, ButtonToolbar, Modal} from "react-bootstrap";
import "./comment.css";


const Comment = (props) => {
    const {text} = props;
    const [show, setShow] = useState(false);

    return (
        <ButtonToolbar>
            <Button onClick={() => {setShow(true)}}>&#9776;</Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Comment
                    </Modal.Title>
                </Modal.Header>
                <>
                      <p>
                          {text}
                      </p>
                </>
            </Modal>
        </ButtonToolbar>
    );
};

export default Comment;