import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import UserAlgosPage from '../../../components/pages/user-algos';


const UserAlgosContainer = (props) => {
    const {activeUser, algoBridgeService, ...clearProps} = props; 
    algoBridgeService.userAlgos(activeUser)
    .then((res) => {
        const algoProps = ['Title', 'Complexity'];

        return (
            <UserAlgosPage {...clearProps} userAlgos={res.userAlgos} algoProps={algoProps} /> 
        );
    });
};

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
    }
};

export default compose(
    withAlgoBridgeService(),
    connect(mapStateToProps)
)(UserAlgosContainer);
