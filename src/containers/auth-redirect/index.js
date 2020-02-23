import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {Redirect} from "react-router";


const AuthRedirect = (props) => {
    const {linkLogin, authToken, activeUser} = props;
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

const mapStateToProps = ({isLogin, links}) => {
    return {
        authToken: window.localStorage.getItem('authToken'),
        activeUser: JSON.parse(window.localStorage.getItem('activeUser')),
        linkLogin: links.login.href,
    }
};

export default compose(
    connect(mapStateToProps)
)(AuthRedirect);
