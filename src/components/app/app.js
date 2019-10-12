import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from '../pages/home';
import LoginPageContainer from '../../containers/pages/login-page-container';
import SignupPageContainer from '../../containers/pages/signup-page-container';
import LogoutPage from '../pages/logout';
import Header from '../header';
import './app.css';
import UserHome from '../pages/user-home';
import AuthRedirect from "../../containers/auth-redirect";


const App = () => {
    return (
        <div className="app">
            <Header title="Algo Bridge" />
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/login' component={LoginPageContainer} exact />
                <Route path='/signup' component={SignupPageContainer} exact />
                <Route path='/logout' component={LogoutPage} exact />

                <AuthRedirect>
                    <Route path='/user-home' component={UserHome} exact />
                </AuthRedirect>
            </Switch>
        </div>
    );
};

export default App;
