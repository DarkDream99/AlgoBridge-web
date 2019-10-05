import React, {Component} from 'react';
import LoginPage from '../../../components/pages/login/login-page';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';


class LoginPageContainer extends Component {
    state = {
        loading: false,
    };

    changeLoading = (mode) => {
        this.setState({
            loading: mode,
        });
    };

    onLogin = (email='test1@gmail.com', password='test1') => {
        const {algoBridgeService} = this.props;
        this.changeLoading(true);
        algoBridgeService.loginUser(email, password)
            .then((data) => {
                console.log(data);
                this.changeLoading(false);
            });
    };

    render() {
        const {loading} = this.state;
        return <LoginPage onLogin={this.onLogin} loading={loading} />
    }
}

export default withAlgoBridgeService()(LoginPageContainer);
