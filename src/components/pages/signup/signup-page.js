import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import './signup-page.css';
import AlgoSpinner from "../../spinner";


const SignupPage = ({loading, onRegister, links, errorMessage}) => {
    let loader = null;
    if (loading) {
        loader = <AlgoSpinner/>;
    }

    return (
        <Fragment>
            <menu className="links">
                <LinkList links={links} />
            </menu>
            <PageTitle title={"Register"} />
            <IdentificationBody actionText='Register'
                                action={onRegister}
                                isRegister={true}
                                loader={loader}
                                errorMessage={errorMessage}
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
