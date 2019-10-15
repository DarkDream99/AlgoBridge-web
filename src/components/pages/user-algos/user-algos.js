import React from 'react';
import {Table} from 'react-bootstrap';
import PageTitle from '../../page-title';
import './user-algos.css';


const UserAlgosPage = ({algoProps, userAlgos}) => {
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
    return (
        <div>
            <PageTitle title="My algos" />
            
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
        </div>
    );
};

export default UserAlgosPage;
