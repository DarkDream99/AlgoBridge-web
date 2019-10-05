import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from '../pages/home';
import LoginPageContainer from '../../containers/pages/login-page-container';
import SignupPageContainer from '../../containers/pages/signup-page-container';
import LogoutPage from '../pages/logout';
import Header from '../header';
import './app.css';


const App = () => {
    return (
        <div className="app">
            <Header title="Algo Bridge" />
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/login' component={LoginPageContainer} exact />
                <Route path='/signup' component={SignupPageContainer} exact />
                <Route path='/logout' component={LogoutPage} exact />
            </Switch>
        </div>
    );
};

export default App;
