import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';

import './login-page.css';


const LoginPage = ({links: linkListObj}) => {
    return (
        <Fragment>
            <menu className="links">
                <LinkList linkListObj={linkListObj} />
            </menu>
            <PageTitle title={"Login"}></PageTitle>
            <IdentificationBody actionText='Login' />
        </Fragment>
    );
};


const mapStateToProps = ({links}) => {
    return { 
        links: [
            links.home,
            links.signup,
        ]
    }
}


export default connect(mapStateToProps)(LoginPage);

