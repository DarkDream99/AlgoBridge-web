import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LoginPage from '../../../components/pages/login/login-page';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoadin from '../../../components/hoc/with-loading';
import {compose} from 'redux';


class LoginPageContainer extends Component {
    onLogin = (email='test1@gmail.com', password='test1') => {
        const {algoBridgeService, swapLoading} = this.props;
        swapLoading(true);
        algoBridgeService.loginUser(email, password)
            .then((ok) => {
                swapLoading(false);
                if (ok) {
                    this.props.history.push('/user-home/');
                }
            });
    };

    render() {
        const {loading} = this.props;
        return <LoginPage onLogin={this.onLogin} loading={loading} />
    }
}

export default compose(
    withRouter,
    withAlgoBridgeService(),
    withLoadin(),
)(LoginPageContainer);
