import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, BrowserRouter as Router, Switch} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import App from './../app';


let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});


afterEach(() => {
    document.body.removeChild(container);
    container = null;
});


it('routers', () => {
    act(() => {
        global.window = Object.create(window);
        const url = "127.0.0.1:3000/login";
        Object.defineProperty(window, 'location', {
            value: {
                href: url
            }
        });

        ReactDOM.render(
            <>
                <Router>
                    <App />
                    <Redirect to="/login" />
                </Router>
            </>, 
            container
        );

        expect(window.location.href).toEqual(url);
        expect(container.querySelectorAll('div').length).toBe(1);
        const headerBlock = container.querySelector('div');
        // TODO this test
        // expect(headerBlock.textContent).toBe('Login page');
    });
});
