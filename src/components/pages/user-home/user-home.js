import React from 'react';
import {connect} from 'react-redux';


const UserHome = ({activeUser}) => {
    return (
        <div>
            <div>User home</div>
            <div>Hello {activeUser.name}, email: {activeUser.email}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser 
    }
};  

export default connect(mapStateToProps)(UserHome);
