import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import './header.css';


const Header = (props) => {
    return (
        <Jumbotron fluid className='header'>
            {props.title}
        </Jumbotron>
    );
}

export default Header;
