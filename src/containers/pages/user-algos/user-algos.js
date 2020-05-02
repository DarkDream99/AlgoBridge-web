import React, {Component} from 'react';
import {compose} from 'redux';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import UserAlgosPage from '../../../components/pages/user-algos';


class UserAlgosContainer extends Component {
    state = {
        userAlgos: [],
    };

    componentDidMount() {
        const {algoBridgeService, swapLoading} = this.props;
        swapLoading(true);
        algoBridgeService.userAlgos()
            .then((algos) => {
                this.setState({
                    userAlgos: algos,
                });
                swapLoading(false);
            });
    }

    render() {
        const {algoBridgeService, ...clearProps} = this.props;
        const algoProps = [['Title', 'title']];
        return (
            <UserAlgosPage {...clearProps} userAlgos={this.state.userAlgos} algoProps={algoProps} />
        );
    }
}


export default compose(
    withAlgoBridgeService(),
    withLoading(),
)(UserAlgosContainer);
