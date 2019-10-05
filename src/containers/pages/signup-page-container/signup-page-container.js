import React, {Component} from 'react';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import SignupPage from "../../../components/pages/signup/signup-page";


class SignupPageContainer extends Component {
    state = {
        loading: false,
    };

    changeLoading = (mode) => {
        this.setState({
            loading: mode,
        });
    };

    onSignup = (email='test1@gmail.com', password='test1') => {
        const {algoBridgeService} = this.props;
        this.changeLoading(true);
        algoBridgeService.signupUser(email, password)
            .then((data) => {
                console.log(data);
                this.changeLoading(false);
            });
    };

    render() {
        const {loading} = this.state;
        return <SignupPage onSignup={this.onSignup} loading={loading} />
    }
}

export default withAlgoBridgeService()(SignupPageContainer);
