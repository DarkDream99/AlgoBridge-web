import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LoginPage from '../../../components/pages/login/login-page';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoadin from '../../../components/hoc/with-loading';
import withErrorIndicator from '../../../components/hoc/with-error-indicator';
import {compose} from 'redux';


class LoginPageContainer extends Component {
    onLogin = (email='test1@gmail.com', password='test1') => {
        const {algoBridgeService, swapLoading, setError} = this.props;
        swapLoading(true);
        setError('');
        
        algoBridgeService.loginUser(email, password)
            .then((ok) => {
                swapLoading(false);
                if (ok) {
                    this.props.history.push('/user-home/');
                } else {
                    setError('Email or password is not correct. Check and try again.');
                }
            });
    };

    render() {
        const {loading, error} = this.props;
        return <LoginPage onLogin={this.onLogin} loading={loading} errorMessage={error} />
    }
}

export default compose(
    withRouter,
    withAlgoBridgeService(),
    withLoadin(),
    withErrorIndicator(),
)(LoginPageContainer);
