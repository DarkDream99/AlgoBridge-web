import React, {Fragment} from 'react';
import {compose} from 'redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';

import './login-page.css';
import AlgoSpinner from "../../spinner";
import withAlgoBridgeConstantsService from '../../hoc/with-algobridge-constants-service';


const LoginPage = ({loading, onLogin, errorMessage, algoBridgeConstantsService}) => {
    let loader = null;
    if (loading) {
        loader = <AlgoSpinner/>;
    }

    const links = algoBridgeConstantsService.links;
    return (
        <Fragment>
            <menu className="links">
                <LinkList links={[links.home, links.register]} />
            </menu>
            <PageTitle>
                Login
            </PageTitle>
            <IdentificationBody actionText='Login'
                action={onLogin}
                loader={loader}
                errorMessage={errorMessage}
             />
        </Fragment>
    );
};


export default compose(
    withAlgoBridgeConstantsService()
)(LoginPage);
