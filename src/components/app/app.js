import { compose } from 'redux';
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import AuthRedirect from "../../containers/auth-redirect";
import Header from '../header';
import HomePage from '../pages/home';
import LoginPage from '../../components/pages/login/login-page';
import LogoutPage from '../pages/logout';
import ShowAlgoPage from "../pages/show-algo";
import SignupPage from '../../components/pages/signup';
import UserAlgosPage from '../../components/pages/user-algos';
import UserHome from '../pages/user-home';
import pathes from '../../constants/pathes';

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

    logIn = (authToken, activeUser) => {
        window.localStorage.setItem('authToken', authToken);
        window.localStorage.setItem('activeUser', JSON.stringify(activeUser));

        this.setState({
            isLogin: true,
        });
    };

    logOut = () => {
        this.setState({
            isLogin: false,
        }, () => {
            window.localStorage.removeItem('authToken');
            window.localStorage.removeItem('activeUser');
            this.props.history.push('/');
        });
    };

    makeHeader() {
        return (
            <Header
                title="Algo Bridge"
                isLogin={this.state.isLogin}
                logout={() => this.logOut()}
            />
        );
    }

    makeRoutings = () => {
        return (
            <div>
                <Switch>
                    <Route path={pathes.BASE} component={HomePage} exact />
                    <Route path={pathes.LOGIN} exact>
                        <LoginPage login={(authToken, activeUser) => this.logIn(authToken, activeUser)} />
                    </Route>
                    <Route path={pathes.REGISTER} exact>
                        <SignupPage login={(authToken, activeUser) => this.logIn(authToken, activeUser)} />
                    </Route>
                    <Route path={pathes.LOGOUT} component={LogoutPage} exact />

                    <AuthRedirect>
                        <Route path={pathes.USER_HOME} component={UserHome} exact />
                        <Route path={pathes.USER_ALGORITHMS} component={UserAlgosPage} exact />
                        <Route path={pathes.SHOW_ALGORITHM} component={ShowAlgoPage} exact />
                    </AuthRedirect>
                </Switch>
            </div>
        );
    }

    render = () => {
        const header = this.makeHeader();
        const routings = this.makeRoutings();

        return (
            <div className="app background">
                {header}
                {routings}
            </div>
        );
    };
}

export default compose(
    withRouter
)(App);
