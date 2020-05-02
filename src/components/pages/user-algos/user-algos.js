import React from 'react';
import Table from '../../table';
import PageTitle from '../../page-title';
import AlgoSpinner from '../../spinner';
import './user-algos.css';


const UserAlgosPage = ({algoProps, userAlgos, loading, history}) => {
    const rowClickHandlers = userAlgos.map((algo) => {
        return () => history.push(`/algo/${algo.id}/show`);
    });

    let table = (
        <Table headers={algoProps} rows={userAlgos} clickHandlers={rowClickHandlers} />
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
