import React, {Component} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import AlgoEditor from "../../code-ide/algoeditor";
import Button from "../../gui/button";
import GroupButton from "../../gui/button-group";
import PageTitle from "../../page-title";
import TextareaField from '../../gui/textarea-field';
import TextField from '../../gui/text-field';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';

import './new-algo.css'


class NewAlgoPage extends Component {
    constructor(props) {
        super(props)
        const { algoBridgeService } = this.props;
        this.algoBridgeService = algoBridgeService;

        this.state = {
            mode: 'normal',
            error: '',
            output: '',
            titleRef: React.createRef(),
            descriptionRef: React.createRef(),
            operations: [{ type: 'empty', parameter: {} }],
            selectedRow: -1,
        };
    }

    render() {
        const operations = this.state.operations;

        return (
            <div style={{
                width: '60%',
                margin: 'auto',
            }}>
                <PageTitle>Create new algorithm</PageTitle>

                <TextField label='Title of the algorithm'
                           placeholder="Enter algorithm's title"
                           refValue={this.state.titleRef} />
                <TextareaField label='Short description' refValue={this.state.descriptionRef} />

                <div style={{ paddingBottom: '10px' }}>Implementation</div>
                <AlgoEditor operations={operations}
                            syncOperations={(operations) => this._syncOperations(operations)} />
                {this._makeAlgoManageButtons()}

                <TextareaField label='Errors' readOnly value={this.state.error} />
                <TextareaField label='Output' readOnly value={this.state.output} />
            </div>
        )
    }

    _syncOperations = (updatedOperations) => {
        this.setState({operations: updatedOperations});
    };

    _makeAlgoManageButtons() {
        return (
            <GroupButton buttons={[
                <Button key='create'
                    action={() => this._handleCreateAlgo()}
                    classes="success">
                    Create
                </Button>,
                <Button key='run'
                    action={() => this._handleRunImplementation()}>
                    Run
                </Button>
            ]} />
        )
    }

    _handleCreateAlgo = () => {
        let title = this.state.titleRef.current.value;
        let description = this.state.descriptionRef.current.value;
        let operations = JSON.stringify(this.state.operations);

        const { history } = this.props;
        this.algoBridgeService.createAlgo(title, description, operations)
            .then((result) => {
                if (result.status === 201) {
                    let algoId = result.algo_id;
                    history.push(`/algo/${algoId}/show`);
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    _handleRunImplementation = (event) => {
        this.algoBridgeService.runImplementation(JSON.stringify(this.state.operations))
        .then((result) => {
            if (Array.isArray(result)) {
                let vars = result;
                let wileVars = "";
                vars.forEach((item) => {
                    wileVars += `${item["type"]} '${item["name"]}': ${item["value"]}\n`;
                });
                this.setState({
                    output: wileVars,
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
}

export default compose(
    withAlgoBridgeService(),
    withRouter,
)(NewAlgoPage);
