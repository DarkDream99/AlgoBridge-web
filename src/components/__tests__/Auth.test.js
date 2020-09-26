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
        const component = _mountApp();
        expect(component.find(HomePage)).toHaveLength(1);
    });

    it('Should show login component', () => {
        const component = _mountApp('/login');
        expect(component.find(LoginPage)).toHaveLength(1);
    });

    it('Should show logout component', () => {
        const component = _mountApp('/logout');
        expect(component.find(LogoutPage)).toHaveLength(1);
    });

    it('Should show signup component', () => {
        const component = _mountApp('/register');
        expect(component.find(SignupPage)).toHaveLength(1);
    });

    const _mountApp = (initialUrl = '/') => {
        const constantsService = new AlgoBridgeConstantsService();
        return mount(
            <AlgoBridgeConstantsServiceProvider value={constantsService}>
                <MemoryRouter initialEntries={[initialUrl]}>
                    <App/>
                </MemoryRouter>
            </AlgoBridgeConstantsServiceProvider>
        );
    };
});
