import React from 'react';
import {Jumbotron, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './header.css';
import {compose} from "redux";
import {logoutDone} from "../../actions";


const Header = ({title, isLogin, activeUser, logoutDone}) => {
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
                        <Nav.Link href="#home">My learns</Nav.Link>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Create algorithm</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav inline>
                        <NavDropdown title={`Log in as ${activeUser.name}`}>
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => logoutDone()}>Log out</NavDropdown.Item>
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

const mapDispatchToProps = {
    logoutDone,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Header);
