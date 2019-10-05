import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import './signup-page.css';
import AlgoSpinner from "../../spinner";


const SignupPage = ({loading, onSignup, links: linkListObj}) => {
    let loader = null;
    if (loading) {
        loader = <AlgoSpinner/>;
    }

    return (
        <Fragment>
            <menu className="links">
                <LinkList linkListObj={linkListObj} />
            </menu>
            <PageTitle title={"Signup"} />
            <IdentificationBody actionText='Signup'
                                action={onSignup}
                                loader={loader}
            />
        </Fragment>
    );
};

const mapStateToProps = ({links}) => {
    return {
        links: [
            links.home,
            links.login,
        ]
    }
};

export default connect(mapStateToProps)(SignupPage);
