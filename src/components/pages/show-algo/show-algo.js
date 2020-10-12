import React, {Component} from 'react';
import {compose} from 'redux';
import {Link} from 'react-router-dom';

import AlgoEditor from "../../code-ide/algoeditor";
import Button from "../../gui/button";
import ButtonGroup from "../../gui/button-group";
import PageTitle from "../../page-title";
import TextareaField from '../../gui/textarea-field';
import TextField from '../../gui/text-field';
import VisualizeIDEContainer from '../../../containers/visualize-ide';

import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';


class ShowAlgoPage extends Component {

    constructor(props) {
        super(props);
        this.algoId = props.match.params.id;

        this.state = {
            title: '',
            description: '',
            operations: [],
            outputRef: React.createRef(),
            output: '',
            error: '',
            isVisual: false,
        };
    }

    componentDidMount() {
        this._loadsUserAlgo(); }

    _loadsUserAlgo() { const {algoBridgeService, swapLoading} = this.props;
        swapLoading(true);
        algoBridgeService.userAlgo(this.algoId)
            .then((algo) => {
                this.setState({
                    title: algo.title,
                    description: algo.description,
                    operations: JSON.parse(algo.implementation)
                });
                swapLoading(false);
            });
    }

    render() {
        const {title, description, error, output, outputRef, isVisual, operations} = this.state;

        const visualText = isVisual ? 'Visualize off' : 'Visualize on';
        const manageAlgoButtonsGroup = (
            <ButtonGroup buttons={[
                <Button key='run' action={() => this.handleRunImplementation(operations)}>Run</Button>,
                <Button key='visual' action={() => this.handleVisualSwitch()}>
                    {visualText}
                </Button>
            ]} />
        );

        return (
            <div style={{
                width: '60%',
                margin: 'auto',
            }}>
                <PageTitle>
                    Show the algorithm (<Link to={`/algo/${this.algoId}/edit`}>Edit</Link>)
                </PageTitle>

                <TextField label='Title of the algorithm'
                           value={title} readOnly />
                <TextareaField label='Short description' value={description} readOnly />

                <div style={{ paddingBottom: '10px' }}>Implementation</div>
                <AlgoEditor operations={operations} readOnly />

                {manageAlgoButtonsGroup}
                <TextareaField label='Errors' readOnly value={error} />
                <TextareaField label='Output' readOnly value={output} refValue={outputRef} />

                <VisualizeIDEContainer
                    isShow={this.state.isVisual}
                    operations={operations}
                    activateEndOfVisualize={(resultState) => this.activateEndOfVisualize(resultState)}
                    setError={(errorMessage) => this.setError(errorMessage)}
                />
            </div>
        )
    }

    handleRunImplementation = (operations) => {
        const {algoBridgeService} = this.props;
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
            const {isVisual} = currState;
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
};

export default compose(
    withAlgoBridgeService(),
    withLoading(),
)(ShowAlgoPage);
