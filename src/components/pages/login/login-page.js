import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import withAlgoBridgeService from '../../hoc/with-algobridge-service';

import './login-page.css';


const onLogin = (algoService, email='test1@gmail.com', password='test1') => {
    algoService.loginUser(email, password)
        .then((data) => {
            console.log(data);
        });
}

const LoginPage = ({links: linkListObj, algoBrigdeService}) => {
    return (
        <Fragment>
            <menu className="links">
                <LinkList linkListObj={linkListObj} />
            </menu>
            <PageTitle title={"Login"}></PageTitle>
            <IdentificationBody actionText='Login' 
                action={() => onLogin(algoBrigdeService)}/>
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


export default withAlgoBridgeService()(
    connect(mapStateToProps)(
        LoginPage
    )
);

