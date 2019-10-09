import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import LoginPage from '../../../components/pages/login/login-page';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoadin from '../../../components/hoc/with-loading';
import withErrorIndicator from '../../../components/hoc/with-error-indicator';
import {loginDone} from '../../../actions'; 


class LoginPageContainer extends Component {
    onLogin = (email='test1@gmail.com', password='test1') => {
        const {algoBridgeService, swapLoading, setError} = this.props;
        swapLoading(true);
        setError('');
        
        algoBridgeService.loginUser(email, password)
            .then((res) => {
                swapLoading(false);
                if (res.ok) {
                    this.props.loginDone(res.activeUser);
                    this.props.history.push('/user-home/');
                } else {
                    setError('Email or password is not correct. Check and try again.');
                }
            })
    };

    render() {
        const {loading, error} = this.props;
        return <LoginPage onLogin={this.onLogin} loading={loading} errorMessage={error} />
    }
}

const mapDispatchToProps = {
    loginDone
};

const mapStateToProps = () => {
    return {}
};

export default compose(
    withRouter,
    withAlgoBridgeService(),
    withLoadin(),
    withErrorIndicator(),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginPageContainer);
