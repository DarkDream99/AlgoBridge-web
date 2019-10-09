import React from 'react';
import {Jumbotron, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './header.css';


const Header = ({title, isLogin, activeUser}) => {
    let header = (
        <Jumbotron fluid className='header'>
            {title}
        </Jumbotron>
    );

    if (isLogin && activeUser) {
        header = (
            <Navbar bg="dark" variant="dark" expand="lg" className='header'>
                <Navbar.Brand href="#home">{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">My algos</Nav.Link>
                        <Nav.Link href="#link">Algo browser</Nav.Link>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Create algorithm</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav inline>
                        <NavDropdown title={`Log in as ${activeUser.name}`}>
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    return (
        <div>{header}</div>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

const mapStateToProps = ({isLogin, activeUser}) => {
    return {
        isLogin,
        activeUser
    }
};

export default connect(mapStateToProps)(Header);
