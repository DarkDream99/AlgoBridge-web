import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';

import HomePage from '../pages/home';
import LoginPageContainer from '../../containers/pages/login-page-container';
import SignupPageContainer from '../../containers/pages/signup-page-container';
import LogoutPage from '../pages/logout';
import Header from '../header';
import './app.css';
import UserHome from '../pages/user-home';
import UserAlgosContainer from '../../containers/pages/user-algos';
import AuthRedirect from "../../containers/auth-redirect";
import NewAlgoPage from "../pages/new-algo";
import ShowAlgoPageContainer from "../../containers/pages/show-algo-page-container";
import EditAlgoPageContainer from "../../containers/pages/edit-algo-page";


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
    }

    logOut = () => {
        this.setState({
            isLogin: false,
        }, () => {
            window.localStorage.removeItem('authToken');
            window.localStorage.removeItem('activeUser');
            this.props.history.push('/');
        });
    }

    render = () => {
        return (
            <div className="app">
                <Header
                    title="Algo Bridge"
                    isLogin={this.state.isLogin}
                    logout={() => this.logOut()}
                />
                <Switch>
                    <Route path='/' component={HomePage} exact />
                    <Route path='/login' exact>
                        <LoginPageContainer login={(authToken, activeUser) => this.logIn(authToken, activeUser)} />
                    </Route>
                    <Route path='/register' exact>
                        <SignupPageContainer login={(authToken, activeUser) => this.logIn(authToken, activeUser)} />
                    </Route>
                    <Route path='/logout' component={LogoutPage} exact />

                    <AuthRedirect>
                        <Route path='/user-home' component={UserHome} exact />
                        <Route path='/user-algos' component={UserAlgosContainer} exact />
                        <Route path='/algo/new' component={NewAlgoPage} exact />
                        <Route path='/algo/:id/edit' component={EditAlgoPageContainer} exact />
                        <Route path='/algo/:id/show' component={ShowAlgoPageContainer} exact />
                    </AuthRedirect>
                </Switch>
            </div>
        );
    }
};

export default compose(
    withRouter
)(App);
