import React, { Component } from 'react';
import PropType from 'prop-types';

import './table.scss';

class Table extends Component {

    static propTypes = {
        headers: PropType.arrayOf(
            PropType.arrayOf(PropType.string)
        ),
        rows: PropType.arrayOf(
            PropType.object
        ),
    }

    renderTableHeader = () => {
        const headerCols = this.props.headers.map(([label]) => {
            return (
                <td key={label}>{label}</td>
            );
        });

        return (
            <tr>{headerCols}</tr>
        );
    }

    renderTableBody = () => {
        const { headers, rows, clickHandlers } = this.props;
        return rows.map((row, index) => {
            const rowCols = this.renderRowCols(row, headers)
            return (
                <tr key={index} onClick={() => clickHandlers[index]()} className='clickable'>
                    {rowCols}
                </tr>
            );
        });
    }

    renderRowCols = (row, headers) => {
        return headers.map(([colTitle, colKey]) => {
            return (
                <td key={colTitle}>{row[colKey]}</td>
            )
        });
    }

    renderTable() {
        return (
            <table className='table'>
                <thead>
                    {this.renderTableHeader()}
                </thead>

                <tbody>
                    {this.renderTableBody()}
                </tbody>
            </table>
        );
    }

    render() {
        const table = this.renderTable();
        return (
            <div>{table}</div>
        );
    }
}

export default Table;
