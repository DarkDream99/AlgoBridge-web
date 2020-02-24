import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import LoginPage from '../../../components/pages/login/login-page';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import withErrorIndicator from '../../../components/hoc/with-error-indicator';
import {loginDone} from '../../../actions'; 


class LoginPageContainer extends Component {
    onLogin = (username='test1', password='test1') => {
        const {algoBridgeService, swapLoading, setError} = this.props;
        swapLoading(true);
        setError('');
        
        algoBridgeService.loginUser(username, password)
            .then((res) => {
                swapLoading(false);
                if (res.token && res.token.length > 0) {
                    this.props.algoBridgeService.userInfo(res.token).then(
                        (result) => {
                            this.props.login(res.token, result.user);
                            this.props.history.push('/user-home/');
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
                } else {
                    setError('Username or password is not correct. Check and try again.');
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
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
    withLoading(),
    withErrorIndicator(),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginPageContainer);
