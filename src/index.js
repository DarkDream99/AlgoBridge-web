import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import {AlgoBridgeServiceTest, AlgoBridgeService} from './services';
import {AlgoBridgeServiceProvider} from './components/service-context';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';


const algoBridgeServiceTest = new AlgoBridgeServiceTest();
const algoBridgeService = new AlgoBridgeService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <AlgoBridgeServiceProvider value={algoBridgeService}>
                <Router>
                    <App />
                </Router>
            </AlgoBridgeServiceProvider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('root')
);
