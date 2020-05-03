import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Jumbotron, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './header.css';
import {compose} from "redux";
import {logoutDone} from "../../actions";


const Header = (props) => {
    const {
        title, links, isLogin, logout, history
    } = props;
    let header = (
        <Jumbotron fluid className='header'>
            {title}
        </Jumbotron>
    );

    const activeUser = JSON.parse(window.localStorage.getItem('activeUser'))
    if (isLogin) {
        header = (
            <Navbar bg="dark" variant="dark" expand="lg" className='header'>
                <Link to={links.userHome.href}>
                    <Navbar.Brand>{title}</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => {history.push(links.userAlgos.href)}}>
                            {links.userAlgos.label}
                        </Nav.Link>
                        <Nav.Link onClick={() => {history.push(links.createNewAlgo.href)}}>
                            {links.createNewAlgo.label}
                        </Nav.Link>
                    </Nav>
                    <Nav inline="true">
                        <NavDropdown title={`Log in as ${activeUser.username}`}>
                            <NavDropdown.Item>Settings</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => {logout()}}>Log out</NavDropdown.Item>
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

const mapStateToProps = ({links}) => {
    return {
        links,
    }
};

const mapDispatchToProps = {};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(Header);
