import React from 'react';
import {Route, Switch} from 'react-router-dom';

import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';
import './app.css';


const App = () => {
    return (
        <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/login' component={LoginPage} exact />
            <Route path='/logout' component={LogoutPage} exact />
        </Switch>
    );
};

export default App;
