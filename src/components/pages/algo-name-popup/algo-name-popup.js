import React from 'react';
import TextareaField from '../../gui/textarea-field';
import TextField from '../../gui/text-field';
import './algo-name-popup.scss';
import Button from '../../gui/button';
import ButtonGroup from '../../gui/button-group';
import { useState, useEffect } from 'react';

const AlgoNamePopup = ({ algo, readOnly, close, submit, isCreation = false }) => {
    const [title, setTitle] = useState(algo ? algo.title : '');
    const [description, setDescription] = useState(algo ? algo.description : '');

    useEffect(() => {
        window.addEventListener('keydown', downKeyHandler);
        return () => {
            window.removeEventListener('keydown', downKeyHandler);
        };
    }, []);

    const downKeyHandler = (event) => {
        if (event.keyCode === 27) {
            close();
        }
    }

    const sendValues = (name, description) => {
        submit(name, description);
        close();
    }

    const renderButtones = (readOnly) => {
        const closeButton = (
            <Button key="popup-accept" action={() => close()}>Close</Button>
        )
        const declineButton = (
            <Button key="popup-decline" action={() => sendValues(algo.title, algo.description)}>Decline</Button>
        )
        const acceptButton = (
            <Button key="popup-accept" action={() => sendValues(title, description)}>Accept</Button>
        )

        let buttons = [closeButton];
        if (!readOnly) {
            if (!isCreation) {
                buttons = [...buttons, declineButton];
            }

            buttons = [...buttons, acceptButton];
        }

        return (<ButtonGroup className="button-group-right-space" buttons={buttons} />)
    }

    return (<div className='popup'>
        <div className='popup_inner'>
            <TextField label='Title of the algorithm'
                value={title} readOnly={readOnly} classes="text-field" onChange={(e) => setTitle(e.target.value)} />
            <TextareaField label='Short description' classes="text-area" value={description} readOnly={readOnly} onChange={(e) => setDescription(e.target.value)} />
            {renderButtones(readOnly)}
        </div>
    </div>);
};

export default AlgoNamePopup;