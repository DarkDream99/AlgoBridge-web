import React, {Component} from 'react';
import PropType from 'prop-types';

import './style/table.css';


class Table extends Component {
    constructor(props) {
        super(props);
        const {headers} = props;

        this.headerCols = this._initTableHeader(headers);
        this.rowsBody = this._initTableBody(props);
    }

    _initTableHeader(headers) {
        const headerCols = headers.map(([label]) => {
            return (
                <td key={label}>{label}</td>
            );
        });

        return (
          <tr>{headerCols}</tr>
        );
    }

    _initTableBody(props) {
        const {headers, rows, clickHandlers} = props;
        return rows.map((row, index) => {
            const rowCols = this._initRowCols(row, headers)
            return (
                <tr key={index} onClick={() => clickHandlers[index]()} className='clickable'>
                    {rowCols}
                </tr>
            );
        });
    }

    _initRowCols(row, headers) {
        return headers.map(([colTitle, colKey]) => {
            return (
                <td key={colTitle}>{row[colKey]}</td>
            )
        });
    }


    render() {
        const table = this._makeTable();
        return (
            <div>{table}</div>
        );
    }

    _makeTable() {
        return (
            <table className='table'>
                <thead>
                    {this.headerCols}
                </thead>

                <tbody>
                    {this.rowsBody}
                </tbody>
            </table>
        );
    }
}


Table.propTypes = {
    headers: PropType.arrayOf(
        PropType.arrayOf(PropType.string)
    ),
    rows: PropType.arrayOf(
        PropType.object
    ),
};


export default Table;
