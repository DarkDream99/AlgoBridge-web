import React from 'react';
import IdentificationBody from '../../identification-body';


const LoginPage = () => {
    const linkObj = {
        href: "/signup",
        label: "Signup"
    }

    return (
        <IdentificationBody title='Login' actionText='Login' linkObj={linkObj} />
    );
};

export default LoginPage;

