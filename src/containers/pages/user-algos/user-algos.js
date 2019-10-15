import React, {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import UserAlgosPage from '../../../components/pages/user-algos';


class UserAlgosContainer extends Component {
    state = {
        userAlgos: [],
    };

    componentDidMount() {
        const {activeUser, algoBridgeService, swapLoading} = this.props; 
        swapLoading(true);
        algoBridgeService.userAlgos(activeUser)
            .then((res) => {
                this.setState({
                    userAlgos: res.userAlgos,
                });
                swapLoading(false);
            });
    }

    render() {
        const {activeUser, algoBridgeService, ...clearProps} = this.props; 
        const algoProps = ['Title', 'Complexity'];
        return (
            <UserAlgosPage {...clearProps} userAlgos={this.state.userAlgos} algoProps={algoProps} /> 
        );
    }
};

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
    }
};

export default compose(
    withAlgoBridgeService(),
    withLoading(),
    connect(mapStateToProps)
)(UserAlgosContainer);
