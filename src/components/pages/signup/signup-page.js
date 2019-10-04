import React, {Fragment} from 'react';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import './signup-page.css';


const SignupPage = () => {
    const linkListObj = [
        {
            href: "/",
            label: "Home",
        },{
            href: "/login",
            label: "Login"
        },
    ]

    return (
        <Fragment>
            <IdentificationBody title='Signup' actionText='Signup' />
            <LinkList linkListObj={linkListObj} />
        </Fragment>
    );
}

export default SignupPage;
