import React from 'react';
import {MemoryRouter} from 'react-router'
import {mount} from 'enzyme';
import App from './../app';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';
import LogoutPage from '../pages/logout';

import {AlgoBridgeConstantsService} from '../../services';
import {AlgoBridgeConstantsServiceProvider} from '../../components/service-context';


describe('App tests', () => {
    it('Should show home component', () => {
        const algoBridgeConstantsService = new AlgoBridgeConstantsService();
        const component = mount(
            <MemoryRouter initialEntries={['/']}>
                <AlgoBridgeConstantsServiceProvider value={algoBridgeConstantsService}>
                    <App/>
                </AlgoBridgeConstantsServiceProvider>
            </MemoryRouter>
        );
        expect(component.find(HomePage)).toHaveLength(1);
    });

    it('Should show login component', () => {
        const algoBridgeConstantsService = new AlgoBridgeConstantsService();
        const component = mount(
            <AlgoBridgeConstantsServiceProvider value={algoBridgeConstantsService}>
                <MemoryRouter initialEntries={['/login']}>
                    <App/>
                </MemoryRouter>
            </AlgoBridgeConstantsServiceProvider>
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
        const algoBridgeConstantsService = new AlgoBridgeConstantsService();
        const component = mount(
            <AlgoBridgeConstantsServiceProvider value={algoBridgeConstantsService}>
                <MemoryRouter initialEntries={['/register']}>
                    <App/>
                </MemoryRouter>
            </AlgoBridgeConstantsServiceProvider>
        );
        expect(component.find(SignupPage)).toHaveLength(1);
    });
});
