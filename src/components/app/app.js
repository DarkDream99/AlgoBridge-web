import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';
import SignupPage from '../pages/signup';
import Header from '../header';
import './app.css';


const App = () => {

    return (
        <div className="app">
            <Header title="Algo Bridge" />
            <Switch>
                <Route path='/' component={HomePage} exact />
                <Route path='/login' component={LoginPage} exact />
                <Route path='/signup' component={SignupPage} exact />
                <Route path='/logout' component={LogoutPage} exact />
            </Switch>
        </div>
    );
};

export default App;
