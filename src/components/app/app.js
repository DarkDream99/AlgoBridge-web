import {compose} from 'redux';
import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import './app.css';
import AuthRedirect from "../../containers/auth-redirect";
import EditAlgoPageContainer from "../../containers/pages/edit-algo-page";
import Header from '../header';
import HomePage from '../pages/home';
import LoginPageContainer from '../../containers/pages/login-page-container';
import LogoutPage from '../pages/logout';
import NewAlgoPage from "../pages/new-algo";
import ShowAlgoPageContainer from "../../containers/pages/show-algo-page-container";
import SignupPageContainer from '../../containers/pages/signup-page-container';
import UserAlgosContainer from '../../containers/pages/user-algos';
import UserHome from '../pages/user-home';


class App extends Component {
    state = {
        isLogin: false
    };

    constructor(props) {
        super(props);
        if (!this.state.isLogin && window.localStorage.getItem('authToken')) {
            this.state.isLogin = true;
        }
    }

    render = () => {
        const header = this._makeHeader();
        const authRoutings = this._makeAuthRoutings();
        const staffRoutings = this._makeStaffRoutings();

        return (
            <div className="app">
                {header}
                <Switch>
                    <Route path='/' component={HomePage} exact />
                    {authRoutings}

                    <AuthRedirect>
                        {staffRoutings}
                    </AuthRedirect>
                </Switch>
            </div>
        );
    };

    _makeHeader() {
        return (
            <Header
                title="Algo Bridge"
                isLogin={this.state.isLogin}
                logout={() => this._logOut()}
            />

        );
    }

    _makeAuthRoutings() {
        return (
            <>
                <Route path='/login' exact>
                    <LoginPageContainer login={(authToken, activeUser) => this._logIn(authToken, activeUser)} />
                </Route>
                <Route path='/register' exact>
                    <SignupPageContainer login={(authToken, activeUser) => this._logIn(authToken, activeUser)} />
                </Route>
                <Route path='/logout' component={LogoutPage} exact />
            </>
        );
    }

    _makeStaffRoutings() {
        return (
            <>
                <Route path='/user-home' component={UserHome} exact />
                <Route path='/user-algos' component={UserAlgosContainer} exact />
                <Route path='/algo/new' component={NewAlgoPage} exact />
                <Route path='/algo/:id/edit' component={EditAlgoPageContainer} exact />
                <Route path='/algo/:id/show' component={ShowAlgoPageContainer} exact />

            </>
        );
    }

    _logIn = (authToken, activeUser) => {
        window.localStorage.setItem('authToken', authToken);
        window.localStorage.setItem('activeUser', JSON.stringify(activeUser));

        this.setState({
            isLogin: true,
        });
    };

    _logOut = () => {
        this.setState({
            isLogin: false,
        }, () => {
            window.localStorage.removeItem('authToken');
            window.localStorage.removeItem('activeUser');
            this.props.history.push('/');
        });
    };
};

export default compose(
    withRouter
)(App);
