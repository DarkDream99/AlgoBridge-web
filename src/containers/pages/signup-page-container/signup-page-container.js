import React, {Component} from 'react';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import SignupPage from "../../../components/pages/signup/signup-page";
import withLoadin from '../../../components/hoc/with-loading';
import {compose} from "../../../utils";


class SignupPageContainer extends Component {
    onSignup = (email='test1@gmail.com', password='test1') => {
        const {algoBridgeService, swapLoading} = this.props;
        swapLoading(true);
        algoBridgeService.signupUser(email, password)
            .then((data) => {
                console.log(data);
                swapLoading(false);
            });
    };

    render() {
        const {loading} = this.props;
        return <SignupPage onSignup={this.onSignup} loading={loading} />
    }
}

export default compose(
    withAlgoBridgeService(),
    withLoadin(),
)(SignupPageContainer);
