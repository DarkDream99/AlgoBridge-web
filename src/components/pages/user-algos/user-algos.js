import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import withAlgoBridgeService from '../../hoc/with-algobridge-service';
import withLoading from '../../hoc/with-loading';
import { withRouter } from 'react-router-dom';

import AlgoSpinner from '../../spinner';
import PageTitle from '../../page-title';
import Table from '../../table';
import { selectAlgoInList, fetchAlgos } from '../../../actions';
import { getUserAlgosState, isLoadingAlgosState, getSelectedAlgoState } from '../../../selectors';
import pathes from '../../../constants/pathes';

import './user-algos.css';


class UserAlgosPage extends Component {
    componentDidMount() {
        this.props.fetchAlgos();
    }

    getAlgosTable() {
        const algoProps = [['Title', 'title']];

        const { isLoading, algos } = this.props;
        let table = (
            <Table headers={algoProps}
                rows={algos}
                clickHandlers={this.getRowHandlers()}
            />
        );
        if (isLoading) {
            table = <AlgoSpinner />
        }
        return table;
    }

    getRowHandlers() {
        const { history, selectAlgoInList, algos } = this.props;

        return algos.map((algo) => {
            return () => {
                selectAlgoInList(algo.id);
                history.push(pathes.SHOW_ALGORITHM)
            }
        });
    }

    render() {
        const algosTable = this.getAlgosTable();

        return (
            <div className='container'>
                <PageTitle>My algos</PageTitle>
                {algosTable}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    algos: getUserAlgosState(state),
    isLoading: isLoadingAlgosState(state),
    selectedAlgo: getSelectedAlgoState(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    selectAlgoInList,
    fetchAlgos,
}, dispatch);

export default compose(
    withRouter,
    withAlgoBridgeService(),
    withLoading(),
    connect(mapStateToProps, mapDispatchToProps),
)(UserAlgosPage);
