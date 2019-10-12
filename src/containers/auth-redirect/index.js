import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {Redirect} from "react-router";


const AuthRedirect = (props) => {
    const {linkLogin, isLogin} = props;
    let template = <Redirect to={linkLogin} />;

    if (isLogin) {
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
        isLogin: isLogin,
        linkLogin: links.login.href,
    }
};

export default compose(
    connect(mapStateToProps)
)(AuthRedirect);
