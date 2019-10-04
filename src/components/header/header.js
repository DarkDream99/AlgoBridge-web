import React from 'react';
import {Jumbotron} from 'react-bootstrap';
import PropTypes from 'prop-types';

import './header.css';


const Header = ({title}) => {
    return (
        <Jumbotron fluid className='header'>
            {title}
        </Jumbotron>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;
