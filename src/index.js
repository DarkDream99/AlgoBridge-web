import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/app';
import ErrorBoundry from './components/error-boundry';
import {
    AlgoBridgeServiceDummy, AlgoBridgeService, AlgoBridgeConstantsService
} from './services';
import {
    AlgoBridgeServiceProvider, AlgoBridgeConstantsServiceProvider
} from './components/service-context';

import 'bootstrap/dist/css/bootstrap.min.css';


// const algoBridgeServiceDummy = new AlgoBridgeServiceDummy();
const algoBridgeService = new AlgoBridgeService();
const algoBridgeConstantsService = new AlgoBridgeConstantsService();

ReactDOM.render(
    <AlgoBridgeConstantsServiceProvider value={algoBridgeConstantsService}>
        <ErrorBoundry>
            <AlgoBridgeServiceProvider value={algoBridgeService}>
                <Router>
                    <App />
                </Router>
            </AlgoBridgeServiceProvider>
        </ErrorBoundry>
    </AlgoBridgeConstantsServiceProvider>,
    document.getElementById('root')
);
