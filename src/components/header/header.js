import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {compose} from "redux";
import './header.scss';
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
            <div className='header'>
                {title}
            </div>
        );
    }

    _makeUserHeader() {
        const {
            title, logout, algoBridgeConstantsService,
        } = this.props;
        const links = algoBridgeConstantsService.links;
        const activeUser = JSON.parse(window.localStorage.getItem('activeUser')) || '';

        return (
            <div className='topnav'>
                <Link to={links.userHome.href} className="active link">
                    {title}
                </Link>
                <Link to={links.userAlgos.href} className="link">
                    {links.userAlgos.label}
                </Link>
                <Link to={links.createNewAlgo.href} className="link">
                    {links.createNewAlgo.label}
                </Link>
                <Link to={''}
                      className="link right-position"
                      onClick={(event) => {event.preventDefault(); logout()}}
                >
                    Log out ({activeUser.username})
                </Link>
                <Link to="" className="icon" onClick={() => {}}>
                    <i className="fa fa-bars"></i>
                </Link>
            </div>
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
