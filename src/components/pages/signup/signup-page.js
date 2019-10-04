import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import './signup-page.css';


const SignupPage = ({links: linkListObj}) => {
    return (
        <Fragment>
            <menu className="links">
                <LinkList linkListObj={linkListObj} />
            </menu>
            <PageTitle title={"Signup"}></PageTitle>
            <IdentificationBody actionText='Signup' />
        </Fragment>
    );
}

const mapStateToProps = ({links}) => {
    return {
        links: [
            links.home,
            links.login,
        ]
    }
} 

export default connect(mapStateToProps)(SignupPage);
