import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import withAlgoBridgeService from '../../hoc/with-algobridge-service';

import './login-page.css';
import AlgoSpinner from "../../spinner";


const onLogin = (algoService, changeLoading, email='test1@gmail.com', password='test1') => {
    changeLoading(true);
    algoService.loginUser(email, password)
        .then((data) => {
            console.log(data);
            changeLoading(false);
        });
};

class LoginPage extends Component {
    state = {
        loading: false,
    };

    changeLoading = (mode) => {
        this.setState({
            loading: mode,
        });
    };

    render() {
        const {loading} = this.state;
        const {links: linkListObj, algoBrigdeService} = this.props;
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
                                    action={() => onLogin(algoBrigdeService, this.changeLoading)}
                                    loader={loader}
                />
            </Fragment>
        );
    }
}


const mapStateToProps = ({links}) => {
    return { 
        links: [
            links.home,
            links.signup,
        ]
    }
};


export default withAlgoBridgeService()(
    connect(mapStateToProps)(
        LoginPage
    )
);

