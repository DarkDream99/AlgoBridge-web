import React from 'react';
import ReactDOM from 'react-dom';
import {Redirect, BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import {shallow} from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from './../app';
import HomePage from '../pages/home';


let container;
let pathMap = {};

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    const component = shallow(<App/>);
    console.log(component);

    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props;
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
    }, {});

});


afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('Should show home component', () => {
    expect(pathMap['/']).toBe(HomePage);
});


