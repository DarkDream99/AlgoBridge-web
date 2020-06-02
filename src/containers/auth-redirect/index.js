import React from 'react';
import {compose} from "redux";
import {Redirect} from "react-router";

import withAlgoBridgeConstantsService from '../../components/hoc/with-algobridge-constants-service';


const AuthRedirect = (props) => {
    const {algoBridgeConstantsService} = props;

    const authToken = window.localStorage.getItem('authToken');
    const activeUser = JSON.parse(window.localStorage.getItem('activeUser'));
    const linkLogin = algoBridgeConstantsService.links.login.href;
    let template = <Redirect to={linkLogin} />;

    if (authToken && activeUser) {
        template = (
            <>
                {props.children}
            </>
        );
    }

    return (
        <div>{template}</div>
    )
};


export default compose(
    withAlgoBridgeConstantsService(),
)(AuthRedirect);
