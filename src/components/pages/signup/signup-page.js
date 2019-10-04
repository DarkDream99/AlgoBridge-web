import React, {Fragment} from 'react';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
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
            <menu className="links">
                <LinkList linkListObj={linkListObj} />
            </menu>
            <PageTitle title={"Signup"}></PageTitle>
            <IdentificationBody actionText='Signup' />
        </Fragment>
    );
}

export default SignupPage;
