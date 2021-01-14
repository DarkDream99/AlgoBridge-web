import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCog, faPen } from "@fortawesome/free-solid-svg-icons"

import AlgoEditor from "../../code-ide/algoeditor";
import Button from "../../gui/button";
import ButtonGroup from "../../gui/button-group";
import PageTitle from "../../page-title";
import TextareaField from '../../gui/textarea-field';
import VisualizeIDEContainer from '../../../containers/visualize-ide';
import { isLoadingAlgoState, getSelectedAlgoState } from '../../../selectors';
import {
    fetchAlgo,
    selectAlgoInList,
    createAlgo,
    updateAlgo,
    deleteAlgo,
} from '../../../actions';
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

    componentDidUpdate() {
        const { selectedAlgo } = this.props;
        if (selectedAlgo && selectedAlgo.id && this.state.isNewAlgo) {
            this.setState({ isNewAlgo: false });
        }
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
        history.push(pathes.USER_ALGORITHMS);
    }

    changeAlgoName = (name, description) => {
        const { algo, isNewAlgo } = this.state;
        const updatedAlgo = { ...algo, title: name, description };
        this.setState({
            algo: updatedAlgo
        });

        if (isNewAlgo) {
            this.saveAlgo(updatedAlgo, true);
        }
    }

    syncOperations = (operations) => {
        const { algo } = this.state;
        this.setState({
            algo: { ...algo, implementation: operations }
        });
    }

    handleCreateAlgo = () => {
        const { isNewAlgo, algo } = this.state;
        if (isNewAlgo) {
            this.setState({ isOpenedPopup: true });
        } else {
            this.saveAlgo(algo, false);
        }
    }

    handleDeleteAlgo = () => {
        const { deleteAlgo, history } = this.props;
        deleteAlgo(this.state.algo.id);
        history.push(pathes.USER_ALGORITHMS);
    }

    saveAlgo = (algo, isNew) => {
        const { createAlgo, updateAlgo } = this.props;
        const newAlgo = { ...algo, implementation: JSON.stringify(algo.implementation) };
        if (isNew) {
            createAlgo(newAlgo);
        } else {
            updateAlgo(algo.id, newAlgo);
        }

        this.setState({ isEditMode: false });
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
                <FontAwesomeIcon icon={faPen} />
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
        const { error, output, outputRef, isEditMode, algo, isNewAlgo } = this.state;
        const operations = algo ? algo.implementation : [{ type: operationTypes.EMPTY, parameter: {} }];

        return (
            <div className="algo-container">
                <PageTitle leftElements={this.renderHeaderButtons()}>
                    {algo ? algo.title : 'Create algorithm'}
                </PageTitle>

                {this.renderManageButtons()}
                <div style={{ paddingBottom: '10px' }}>Implementation</div>
                <div className="implementation">
                    <div className="element">
                        <AlgoEditor operations={operations}
                            syncOperations={(operations) => this.syncOperations(operations)} readOnly={!isEditMode} />
                    </div>
                    <div className="vertical-line" />
                    <div className="element">
                        <VisualizeIDEContainer
                            isShow={this.state.isVisual}
                            operations={operations}
                            activateEndOfVisualize={(resultState) => this.activateEndOfVisualize(resultState)}
                            setError={(errorMessage) => this.setError(errorMessage)}
                        />
                    </div>
                </div>
                <div className="output">
                    <div className="element">
                        <TextareaField label='Errors' readOnly value={error} />
                    </div>
                    <div className="element">
                        <TextareaField label='Output' readOnly value={output} refValue={outputRef} />
                    </div>
                </div>

                {this.state.isOpenedPopup
                    ? <AlgoNamePopup
                        isCreation={isNewAlgo}
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
    isLoading: isLoadingAlgoState(state),
    selectedAlgo: getSelectedAlgoState(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchAlgo,
    selectAlgoInList,
    createAlgo,
    updateAlgo,
    deleteAlgo
}, dispatch);

export default compose(
    withAlgoBridgeService(),
    withLoading(),
    connect(mapStateToProps, mapDispatchToProps),
)(ShowAlgoPage);
