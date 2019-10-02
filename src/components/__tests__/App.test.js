import React from 'react';
import {Route} from 'react-router-dom';
import {shallow} from 'enzyme';
import App from './../app';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';


let pathMap = {};

describe('App tests', () => {
    beforeAll(() => {
        const component = shallow(<App/>);

        pathMap = component.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props();
            pathMap[routeProps.path] = routeProps.component;
            return pathMap;
        }, {});
    });

    it('Should show home component', () => {
        expect(pathMap['/']).toBe(HomePage);
    });

    it('Should show login component', () => {
        expect(pathMap['/login']).toBe(LoginPage);
    });

    it('Should show logout component', () => {
        expect(pathMap['/logout']).toBe(LogoutPage);
    });
});




