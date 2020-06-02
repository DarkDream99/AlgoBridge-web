import React from 'react';
import PageTitle from "../../page-title";


const UserHome = () => {
    const activeUser = JSON.parse(window.localStorage.getItem('activeUser'));
    return (
        <>
            <PageTitle title="Home" />
            <div>email: {activeUser.email}</div>
        </>
    )
};


export default UserHome;
