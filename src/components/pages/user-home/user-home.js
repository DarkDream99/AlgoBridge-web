import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import PageTitle from "../../page-title";


const UserHome = ({activeUser}) => {
    return (
        <>
            <PageTitle title="Home" />
            <div>email: {activeUser.email}</div>
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
