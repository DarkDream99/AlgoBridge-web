import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';

import './login-page.css';
import AlgoSpinner from "../../spinner";

const LoginPage = (props) => {
     const {
         loading,
         onLogin,
         links: linkListObj,
     } = props;

     let loader = null;
     if (loading) {
         loader = <AlgoSpinner/>;
     }

     return (
         <Fragment>
             <menu className="links">
                 <LinkList linkListObj={linkListObj} />
             </menu>
             <PageTitle title={"Login"} />
             <IdentificationBody actionText='Login'
                                 action={onLogin}
                                 loader={loader}
             />
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
};


export default connect(mapStateToProps)(
    LoginPage
);

