import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import {
    AlgoBridgeService, AlgoBridgeConstantsService
} from './services';
import {
    AlgoBridgeServiceProvider, AlgoBridgeConstantsServiceProvider
} from './components/service-context';

import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store'


const algoBridgeService = new AlgoBridgeService();
const algoBridgeConstantsService = new AlgoBridgeConstantsService();


ReactDOM.render(
    <Provider store={store}>
        <AlgoBridgeConstantsServiceProvider value={algoBridgeConstantsService}>
            <ErrorBoundry>
                <AlgoBridgeServiceProvider value={algoBridgeService}>
                    <Router>
                        <App />
                    </Router>
                </AlgoBridgeServiceProvider>
            </ErrorBoundry>
        </AlgoBridgeConstantsServiceProvider>
    </Provider>,
    document.getElementById('root')
);
