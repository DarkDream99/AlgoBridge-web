import {Jumbotron, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {compose} from "redux";
import './header.css';
import withAlgoBridgeConstantsService from '../hoc/with-algobridge-constants-service';


class Header extends Component {

    render = () => {
        const {isLogin} = this.props;
        let header = this._makeGuestHeader();
        if (isLogin) {
            header = this._makeUserHeader();
        }

        return (
            <div>{header}</div>
        );
    };

    _makeGuestHeader() {
        const {title} = this.props;
        return (
            <Jumbotron fluid className='header'>
                {title}
            </Jumbotron>
        );
    }

    _makeUserHeader() {
        const {
            title, logout, history, algoBridgeConstantsService,
        } = this.props;
        const links = algoBridgeConstantsService.links;
        const activeUser = JSON.parse(window.localStorage.getItem('activeUser')) || '';

        return (
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
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
};


export default compose(
    withRouter,
    withAlgoBridgeConstantsService(),
)(Header);
