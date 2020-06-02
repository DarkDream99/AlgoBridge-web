import React, {Fragment} from 'react';
import {compose} from 'redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import './signup-page.css';
import AlgoSpinner from "../../spinner";
import withAlgoBridgeConstantsService from '../../hoc/with-algobridge-constants-service';


const SignupPage = ({loading, onRegister, errorMessage, algoBridgeConstantsService}) => {
    let loader = null;
    if (loading) {
        loader = <AlgoSpinner/>;
    }
    const links = algoBridgeConstantsService.links;

    return (
        <Fragment>
            <menu className="links">
                <LinkList links={[links.home, links.login]} />
            </menu>
            <PageTitle>Register</PageTitle>
            <IdentificationBody actionText='Register'
                                action={onRegister}
                                isRegister={true}
                                loader={loader}
                                errorMessage={errorMessage}
            />
        </Fragment>
    );
};


export default compose(
    withAlgoBridgeConstantsService()
)(SignupPage);
