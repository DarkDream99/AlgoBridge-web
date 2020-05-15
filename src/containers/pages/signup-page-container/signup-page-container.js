import React, {Component} from 'react';
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import SignupPage from "../../../components/pages/signup/signup-page";
import withLoading from '../../../components/hoc/with-loading';
import withErrorIndicator from '../../../components/hoc/with-error-indicator';


class SignupPageContainer extends Component {
    onRegister = (username, email, password) => {
        const {algoBridgeService, swapLoading, setError, login, history} = this.props;
        swapLoading(true);
        setError('');

        algoBridgeService.registerUser(username, email, password)
            .then((data) => {
                console.log(data);
                swapLoading(false);

                const {statusCode} = data;
                if (statusCode === 201) {
                    const {token_key: tokenKey} = data;
                    algoBridgeService.userInfo(tokenKey).then(
                        (result) => {
                            login(tokenKey, result.user);
                            history.push('/user-home/');
                        }
                    ).catch((error) => {
                        console.log(error);
                    });
                } else {
                    const errorKeys = Object.keys(data);
                    let errorMessage = "";

                    errorKeys.forEach((errorKey) => {
                        if (errorKey !== 'statusCode') {
                            errorMessage += `${errorKey}: ${data[errorKey]}`
                        }
                    });
                    setError(errorMessage);
                }
            })
            .catch((error) => {
                console.log('error', error);
                const errorKeys = Object.keys(error);
                let errorMessage = "";

                errorKeys.forEach((errorKey) => {
                    if (errorKey !== 'statusCode') {
                        errorMessage += `field: ${errorKey}, error: ${error[errorKey]}`
                    }
                });
                setError(errorMessage);
            });
    };

    render() {
        const {loading, error} = this.props;
        return <SignupPage onRegister={this.onRegister} loading={loading} errorMessage={error} />
    }
}


export default compose(
    withRouter,
    withAlgoBridgeService(),
    withLoading(),
    withErrorIndicator(),
)(SignupPageContainer);
