import React from 'react';
import {Route, Switch} from 'react-router-dom';

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
import ShowAlgoPage from "../pages/show-algo";


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
                    <Route path='/user-algos' component={UserAlgosContainer} exact />
                    <Route path='/algo/new' component={NewAlgoPage} exact />
                    <Route path='/algo/:id/edit' component={null} exact />
                    <Route path='/algo/:id' component={ShowAlgoPage} exact />
                </AuthRedirect>
            </Switch>
        </div>
    );
};

export default App;
