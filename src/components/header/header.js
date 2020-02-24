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
        title, links, isLogin, logout
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
                        <Link to={links.userAlgos.href}>
                            <Navbar.Text>{links.userAlgos.label}</Navbar.Text>
                        </Link>
                        <Nav.Link href="#link">Algo browser</Nav.Link>
                        <Nav.Link href="#home">My learns</Nav.Link>
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            <NavDropdown.Header>
                                <NavDropdown.Item onClick={() => {props.history.push(links.createNewAlgo.href)}}>
                                    {links.createNewAlgo.label}
                                </NavDropdown.Item>
                            </NavDropdown.Header>
                        </NavDropdown>
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
