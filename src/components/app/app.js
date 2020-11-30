import {compose} from 'redux';
import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import AuthRedirect from "../../containers/auth-redirect";
import Header from '../header';
import HomePage from '../pages/home';
import LoginPage from '../../components/pages/login/login-page';
import LogoutPage from '../pages/logout';
import NewAlgoPage from "../pages/new-algo";
import ShowAlgoPage from "../pages/show-algo";
import EditAlgoPage from "../pages/edit-algo";
import SignupPage from '../../components/pages/signup';
import UserAlgosPage from '../../components/pages/user-algos';
import UserHome from '../pages/user-home';

import './app.scss';


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
        const routings = this._makeRoutings();

        return (
            <div className="app">
                {header}
                {routings}
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

    _makeRoutings = () => {
        return (
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/login' exact>
                    <LoginPage login={(authToken, activeUser) => this._logIn(authToken, activeUser)} />
                </Route>
                <Route path='/register' exact>
                    <SignupPage login={(authToken, activeUser) => this._logIn(authToken, activeUser)} />
                </Route>
                <Route path='/logout' component={LogoutPage} exact />

                <AuthRedirect>
                    <Route path='/user-home' component={UserHome} exact />
                    <Route path='/user-algos' component={UserAlgosPage} exact />
                    <Route path='/algo/new' component={NewAlgoPage} exact />
                    <Route path='/algo/:id/edit' component={EditAlgoPage} exact />
                    <Route path='/algo/:id/show' component={ShowAlgoPage} exact />
                </AuthRedirect>
            </Switch>
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
}

export default compose(
    withRouter
)(App);
