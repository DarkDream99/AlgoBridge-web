import React, {Fragment} from 'react';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';


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
            <IdentificationBody title='Login' actionText='Login' />
            <LinkList linkListObj={linkListObj} />
        </Fragment>
    );
};

export default LoginPage;

