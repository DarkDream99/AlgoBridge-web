import React from 'react';
import Table from '../../table';
import PageTitle from '../../page-title';
import AlgoSpinner from '../../spinner'; 
import './user-algos.css';


const UserAlgosPage = ({algoProps, userAlgos, loading}) => {
    let table = (
        <Table headers={algoProps} rows={userAlgos} />
    );
    if (loading) {
        table = <AlgoSpinner />
    }

    return (
        <div>
            <PageTitle title="My algos" />
            {table}            
        </div>
    );
};

export default UserAlgosPage;
