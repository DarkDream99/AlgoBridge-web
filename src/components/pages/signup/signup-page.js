import React, {Component} from 'react';
import {compose} from 'redux';

import IdentificationBody from '../../identification-body';
import LinkList from '../../link-list';
import PageTitle from '../../page-title';
import AlgoSpinner from "../../spinner";

import {withRouter} from 'react-router-dom';
import withLoading from '../../hoc/with-loading';
import withErrorIndicator from '../../hoc/with-error-indicator';
import withAlgoBridgeService from '../../hoc/with-algobridge-service';
import withAlgoBridgeConstantsService from '../../hoc/with-algobridge-constants-service';

import './signup-page.css';


class SignupPage extends Component {
    render() {
        const {loading, error, algoBridgeConstantsService} = this.props;
        let loader = this._getLoader(loading);
        const links = algoBridgeConstantsService.links;

        return (
            <>
                <menu className="links">
                    <LinkList links={[links.home, links.login]} />
                </menu>
                <PageTitle>Register</PageTitle>
                <IdentificationBody actionText='Register'
                                    action={this.onRegister}
                                    isRegister={true}
                                    loader={loader}
                                    errorMessage={error}
                />
            </>
        );
    }

    onRegister = (username, email, password) => {
        const {algoBridgeService, swapLoading, setError} = this.props;
        swapLoading(true);
        setError('');

        algoBridgeService.registerUser(username, email, password)
            .then((data) => {
                this._handleAcceptedRegister(data);
            })
            .catch((error) => {
                this._handleFailedRegister(error)
            });
    };

    _getLoader(loading) {
        return loading ? <AlgoSpinner/> : null;
    }

    _handleAcceptedRegister(data) {
        const { swapLoading } = this.props;
        swapLoading(false);

        const {statusCode} = data;
        if (statusCode === 201) {
            this._handleRegistered(data)
        } else {
            this._handleInvalidWhenRegistering(data);
        }
    }

    _handleFailedRegister(error) {
        const {setError} = this.props;
        const errorKeys = Object.keys(error);
        let errorMessage = "";

        errorKeys.forEach((errorKey) => {
            if (errorKey !== 'statusCode') {
                errorMessage += `field: ${errorKey}, error: ${error[errorKey]}`
            }
        });
        setError(errorMessage);
    }

    _handleRegistered(data) {
        const {algoBridgeService, login, history} = this.props;
        const {token_key: tokenKey} = data;
        algoBridgeService.userInfo(tokenKey).then(
            (result) => {
                login(tokenKey, result.user);
                history.push('/user-home/');
            }
        ).catch((error) => {
            console.log(error);
        });
    }

    _handleInvalidWhenRegistering(data) {
        const {setError} = this.props;
        const errorKeys = Object.keys(data);
        let errorMessage = "";

        errorKeys.forEach((errorKey) => {
            if (errorKey !== 'statusCode') {
                errorMessage += `${errorKey}: ${data[errorKey]}`
            }
        });
        setError(errorMessage);
    }
}


export default compose(
    withRouter,
    withAlgoBridgeService(),
    withAlgoBridgeConstantsService(),
    withLoading(),
    withErrorIndicator(),
)(SignupPage);
