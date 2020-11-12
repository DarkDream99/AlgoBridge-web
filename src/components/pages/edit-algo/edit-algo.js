import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

import AlgoEditor from "../../code-ide/algoeditor";
import Button from "../../gui/button";
import ButtonGroup from "../../gui/button-group";
import TextareaField from '../../gui/textarea-field';
import TextField from '../../gui/text-field';
import PageTitle from "../../page-title";
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';


class EditAlgoPage extends Component {

    constructor(props) {
        super(props);
        this.algoId = props.match.params.id;

        this.state = {
            title: '',
            titleRef: React.createRef(),
            description: '',
            descriptionRef: React.createRef(),
            operations: [],
            selectedRow: -1,
            output: '',
            error: '',
        };
    }

    componentDidMount() {
        this._loadsUserAlgo();
    }

    _loadsUserAlgo() {
        const {algoBridgeService, swapLoading} = this.props;
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
        const {
            title, description, operations, output, error,
            titleRef, descriptionRef,
        } = this.state;

        const manageAlgoButtonsGroup = (
            <ButtonGroup buttons={[
                <Button key='save' action={() => this.handleSaveAlgo()} classes="success">Save</Button>,
                <Button key='run' action={() => this.handleRunImplementation(operations)}>Run</Button>,
                <Button key='delete' action={() => this.handleDeleteAlgo()} classes="danger">Delete</Button>
            ]} />
        );

        return (
            <div style={{
                width: '60%',
                margin: 'auto',
            }}>
                <PageTitle> Edit the algorithm </PageTitle>

                <TextField label='Title of the algorithm'
                           value={title}
                           refValue={titleRef}/>

                <TextareaField label='Short description' value={description} refValue={descriptionRef} />

                <div style={{paddingBottom: '10px'}}>Implementation</div>
                <AlgoEditor operations={operations}
                            syncOperations={(operations) => this.syncOperations(operations)} />

                {manageAlgoButtonsGroup}
                <TextareaField label='Errors' readOnly value={error} />
                <TextareaField label='Output' readOnly value={output} />
            </div>
        )
    }

    syncOperations = (operations) => {
        this.setState({operations: operations});
    }

    handleSaveAlgo = () => {
        const {algoBridgeService, history} = this.props;
        const algoId = this.algoId;
        algoBridgeService.updateAlgo(
            algoId,
            this.state.titleRef.current.value,
            this.state.descriptionRef.current.value,
            JSON.stringify(this.state.operations)
        )
        .then((response) => {
            if (response.statusCode === 200) {
                history.push(`/algo/${algoId}/show`);
            } else {
                console.log(response);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    handleDeleteAlgo = () => {
        const {algoBridgeService, history} = this.props;
        algoBridgeService.deleteAlgo(this.algoId)
        .then((response) => {
            if (response.status === 204) {
                history.push(`/user-algos`);
            } else {
                console.log(response);
            }
        }).catch((error) => {
            console.log(error);
        });
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
};

export default compose(
    withAlgoBridgeService(),
    withLoading(),
    withRouter,
)(EditAlgoPage);
