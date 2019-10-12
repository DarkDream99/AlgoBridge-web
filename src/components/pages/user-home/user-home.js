import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";


const UserHome = ({activeUser}) => {
    return (
        <>
            <div>User home</div>
            <div>Hello {activeUser.name}, email: {activeUser.email}</div>
        </>
    )
};

const mapStateToProps = ({activeUser}) => {
    return {
        activeUser: activeUser,
    }
};  

export default compose(
    connect(mapStateToProps)
)(UserHome);
