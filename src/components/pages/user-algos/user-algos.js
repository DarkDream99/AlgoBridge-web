import React from 'react';
import {Table} from 'react-bootstrap';
import PageTitle from '../../page-title';
import AlgoSpinner from '../../spinner'; 
import './user-algos.css';


const UserAlgosPage = ({algoProps, userAlgos, loading}) => {
    const headers = algoProps.map((label) => {
        return (
            <th key={label}>{label}</th>
        );
    });

    const body = userAlgos.map((algo) => {
        return (
            <tr key={algo.title}>
                <td>{algo.title}</td>
                <td>{algo.complexity}</td>
            </tr>
        );
    });

    let table = (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>

            <tbody>
                {body}
            </tbody>
        </Table>
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
