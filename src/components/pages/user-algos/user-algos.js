import React, {Component} from 'react';
import {compose} from 'redux';

import withAlgoBridgeService from '../../hoc/with-algobridge-service';
import withLoading from '../../hoc/with-loading';
import {withRouter} from 'react-router-dom';

import AlgoSpinner from '../../spinner';
import PageTitle from '../../page-title';
import Table from '../../table';

import './user-algos.css';


class UserAlgosPage extends Component {
    state = {
        userAlgos: [],
    };

    componentDidMount() {
        this._loadUserAlgos();
    }

    _loadUserAlgos() {
        const {algoBridgeService, swapLoading} = this.props;
        swapLoading(true);
        algoBridgeService.userAlgos()
            .then((algos) => {
                this.setState({
                    userAlgos: algos,
                });
                swapLoading(false);
            });
    }

    render() {
        const algosTable = this._getAlgosTable();

        return (
            <div>
                <PageTitle>My algos</PageTitle>
                {algosTable}
            </div>
        );
    }

    _getAlgosTable() {
        const algoProps = [['Title', 'title']];

        const {loading} = this.props;
        let table = (
            <Table headers={algoProps}
                   rows={this.state.userAlgos}
                   clickHandlers={this._getRowHandlers()}
            />
        );
        if (loading) {
            table = <AlgoSpinner />
        }
        return table;
    }

    _getRowHandlers() {
        const {history} = this.props;

        return this.state.userAlgos.map((algo) => {
            return () => history.push(`/algo/${algo.id}/show`);
        });
    }
}

export default compose(
    withRouter,
    withAlgoBridgeService(),
    withLoading(),
)(UserAlgosPage);
