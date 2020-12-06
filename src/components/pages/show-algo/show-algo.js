import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCog, faInfo } from "@fortawesome/free-solid-svg-icons"

import AlgoEditor from "../../code-ide/algoeditor";
import Button from "../../gui/button";
import ButtonGroup from "../../gui/button-group";
import PageTitle from "../../page-title";
import TextareaField from '../../gui/textarea-field';
import TextField from '../../gui/text-field';
import VisualizeIDEContainer from '../../../containers/visualize-ide';
import { getUserAlgoState, isLoadingAlgoState, getSelectedAlgoState } from '../../../selectors';
import { fetchAlgo, selectAlgoInList } from '../../../actions';
import pathes from '../../../constants/pathes';

import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import operationTypes from '../../../constants/operationTypes';
import AlgoNamePopup from '../algo-name-popup';
import './show-algo.scss';


class ShowAlgoPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            outputRef: React.createRef(),
            output: '',
            error: '',
            isVisual: false,
            isOpenedPopup: false,
            isNewAlgo: props.selectedAlgo == null,
            isEditMode: props.selectedAlgo == null,
            algo: props.selectedAlgo,
        };
    }

    componentWillUnmount() {
        selectAlgoInList(null);
    }

    handleRunImplementation = (operations) => {
        const { algoBridgeService } = this.props;
        algoBridgeService.runImplementation(operations)
            .then((result) => {
                if (Array.isArray(result)) {
                    let vars = result;
                    let allVars = "";
                    vars.forEach((item) => {
                        allVars += `${item["type"]} '${item["name"]}': ${item["value"]}\n`;
                    });
                    this.setState({
                        output: allVars,
                        error: ""
                    });
                } else {
                    this.setState({
                        error: result['error'],
                        output: ""
                    });
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    setError = (errorMessage) => {
        this.setState({
            error: errorMessage,
        });
    }

    handleVisualSwitch = () => {
        this.setState((currState) => {
            const { isVisual } = currState;
            return {
                isVisual: !isVisual
            }
        });
    }

    activateEndOfVisualize = (resultState) => {
        let allVars = "";
        resultState.forEach((item) => {
            allVars += `${item["type"]} '${item["name"]}': ${item["value"]}\n`;
        });
        this.setState({
            output: allVars,
            error: ""
        }, () => {
            this.state.outputRef.current.scrollIntoView({
                block: 'center', behavior: 'smooth'
            });
        });
    }

    backToAlgosList = () => {
        const { history } = this.props;
        history.push(pathes.USER_ALGORITHMS)
    }

    changeAlgoName = (name, description) => {
        const { algo } = this.state;
        this.setState({
            algo: { ...algo, title: name, description }
        });
    }

    syncOperations = (operations) => {
        const { algo } = this.state;
        this.setState({
            algo: { ...algo, operations }
        });
    }

    handleCreateAlgo = () => {

    }

    handleDeleteAlgo = () => {

    }

    renderHeaderButtons = () => {
        const { isNewAlgo, isEditMode } = this.state;

        const backButton = (
            <Button key="btn-header-1" action={this.backToAlgosList}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
        );
        const infoButton = (
            <Button key="btn-header-2" action={() => this.setState({ isOpenedPopup: true })}>
                <FontAwesomeIcon icon={faInfo} />
            </Button>
        );
        const editButton = (
            <Button key="btn-header-3" action={() => this.setState({ isEditMode: !isEditMode })}>
                <FontAwesomeIcon icon={faCog} color={isEditMode ? "#27E67A" : ""} />
            </Button>
        );

        let buttons = [backButton];
        if (!isNewAlgo) {
            buttons = [...buttons, infoButton];
        }

        buttons = [...buttons, editButton];

        return (
            <ButtonGroup className="button-group-right-space" buttons={buttons} />)
    }

    renderManageButtons = () => {
        const { isNewAlgo, isVisual, algo, isEditMode } = this.state;
        const operations = algo ? algo.implementation : [{ type: operationTypes.EMPTY, parameter: {} }];
        const visualText = isVisual ? 'Visualize off' : 'Visualize on';
        const saveButton = (
            <Button key='create'
                action={() => this.handleCreateAlgo()}
                classes="success">
                {isNewAlgo ? "Create" : "Save"}
            </Button>
        );
        const runButton = (
            <Button key='run' action={() => this.handleRunImplementation(operations)}>Run</Button>
        );
        const visualButton = (
            <Button key='visual' action={() => this.handleVisualSwitch()}>
                {visualText}
            </Button>
        );
        const deleteButton = (
            <Button key='delete' action={() => this.handleDeleteAlgo()} classes="danger">Delete</Button>
        );

        let buttons = [];
        if (isEditMode) {
            buttons = [...buttons, saveButton];
        }

        buttons = [...buttons, runButton];
        if (!isEditMode && !isNewAlgo) {
            buttons = [...buttons, visualButton];
        }

        if (!isNewAlgo) {
            buttons = [...buttons, deleteButton];
        }

        return (
            <ButtonGroup buttons={buttons} />)
    }

    render() {
        const { error, output, outputRef, isEditMode, algo } = this.state;
        const operations = algo ? algo.implementation : [{ type: operationTypes.EMPTY, parameter: {} }];

        return (
            <div>
                <PageTitle leftElements={this.renderHeaderButtons()}>
                    {algo ? algo.title : 'Create algorithm'}
                </PageTitle>

                <div style={{ paddingBottom: '10px' }}>Implementation</div>
                <AlgoEditor operations={operations}
                    syncOperations={(operations) => this.syncOperations(operations)} readOnly={!isEditMode} />

                {this.renderManageButtons()}
                <TextareaField label='Errors' readOnly value={error} />
                <TextareaField label='Output' readOnly value={output} refValue={outputRef} />

                <VisualizeIDEContainer
                    isShow={this.state.isVisual}
                    operations={operations}
                    activateEndOfVisualize={(resultState) => this.activateEndOfVisualize(resultState)}
                    setError={(errorMessage) => this.setError(errorMessage)}
                />

                {this.state.isOpenedPopup
                    ? <AlgoNamePopup
                        readOnly={!isEditMode}
                        algo={algo}
                        close={() => this.setState({ isOpenedPopup: false })}
                        submit={this.changeAlgoName}
                    />
                    : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    algo: getUserAlgoState(state),
    isLoading: isLoadingAlgoState(state),
    selectedAlgo: getSelectedAlgoState(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAlgo,
    selectAlgoInList,
}, dispatch);

export default compose(
    withAlgoBridgeService(),
    withLoading(),
    connect(mapStateToProps, mapDispatchToProps),
)(ShowAlgoPage);
