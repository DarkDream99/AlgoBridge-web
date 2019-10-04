import React, {Fragment} from 'react';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';

import './login-page.css';


const LoginPage = () => {
    const linkListObj = [
        {
            href: "/",
            label: "Home",
        }, {
            href: "/signup",
            label: "Signup"
        },
    ];

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

export default LoginPage;

