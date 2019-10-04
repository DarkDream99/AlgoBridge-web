import React from 'react';
import IdentificationBody from '../../identification-body';
import './signup-page.css';


const SignupPage = () => {
    const linkObj = {
        href: "/login",
        label: "Login"
    }

    return (
        <IdentificationBody title='Signup' actionText='Signup' linkObj={linkObj} />
    );
}

export default SignupPage;
