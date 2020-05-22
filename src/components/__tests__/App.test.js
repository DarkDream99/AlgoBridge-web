import React from 'react';
import {MemoryRouter} from 'react-router'
import {mount} from 'enzyme';
import App from './../app';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';
import SignupPage from '../pages/signup';


describe('App tests', () => {
    it('Should show home component', () => {
        const component = mount(
            <MemoryRouter initialEntries={['/']}>
                <App/>
            </MemoryRouter>
        );
        expect(component.find(HomePage)).toHaveLength(1);
    });

    it('Should show login component', () => {
        const component = mount(
            <MemoryRouter initialEntries={['/login']}>
                <App/>
            </MemoryRouter>
        );
        expect(component.find(LoginPage)).toHaveLength(1);
    });

    it('Should show logout component', () => {
        const component = mount(
            <MemoryRouter initialEntries={['/logout']}>
                <App/>
            </MemoryRouter>
        );
        expect(component.find(LogoutPage)).toHaveLength(1);
    });

    it('Should show signup component', () => {
        const component = mount(
            <MemoryRouter initialEntries={['/register']}>
                <App/>
            </MemoryRouter>
        );
        expect(component.find(SignupPage)).toHaveLength(1);
    });
});




