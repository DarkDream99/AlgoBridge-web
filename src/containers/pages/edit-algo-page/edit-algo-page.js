import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import EditAlgoPage from '../../../components/pages/edit-algo';


class EditAlgoPageContainer extends Component {
    constructor(props) {
        super(props);
        this.algoId = props.match.params.id;
        this.funcs = [
            {
                name: 'set_item_by_index',
                paramsCount: 3,
                description: ''
            }, {
                name: 'get_item_by_index',
                paramsCount: 2,
                description: ''
            }
        ];

        this.state = {
            title: '',
            description: '',
            operations: [],
            selectedRow: -1,
            output: '',
            error: '',
        };
    }

    componentDidMount() {
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

    handleSaveRowOperation = (newOperation) => {
        const updatedOperations = [
            ...this.state.operations.slice(0, this.state.selectedRow),
            newOperation,
            ...this.state.operations.slice(this.state.selectedRow + 1)
        ];
        this.setState({
            operations: updatedOperations,
            selectedRow: -1,
        });
    };

    handleChangeRowOperationFromDrag = (newOperation, indexFrom, indexTo) => {
        let updatedOperations = [
            ...this.state.operations.slice(0, indexFrom),
            {type: 'empty', parameter: {}},
            ...this.state.operations.slice(indexFrom + 1)
        ];
        updatedOperations = [
            ...updatedOperations.slice(0, indexTo),
            newOperation,
            ...updatedOperations.slice(indexTo + 1)
        ];
        this.setState({
            operations: updatedOperations,
        });
    }

    handleSelectRow = (index) => {
       this.setState({selectedRow: index});
    };

    handleUnselectRow = () => {
        this.setState({selectedRow: -1});
    };

    handleAddRow = (index) => {
        const emptyOperation = {type: 'empty', parameter: {}};
        const updatedOperations = [
            ...this.state.operations.slice(0, index+1),
            emptyOperation,
            ...this.state.operations.slice(index+1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    };

    handleRemoveRow = (index) => {
        if (this.state.operations.length === 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleMoveRowUp = (index) => {
        if (index === 0)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index-1),
            this.state.operations[index],
            this.state.operations[index-1],
            ...this.state.operations.slice(index + 1)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleMoveRowDown = (index) => {
        if (index === this.state.operations.length - 1)
            return;

        const updatedOperations = [
            ...this.state.operations.slice(0, index),
            this.state.operations[index+1],
            this.state.operations[index],
            ...this.state.operations.slice(index + 2)
        ];
        this.setState({operations: updatedOperations, selectedRow: -1});
    }

    handleSaveRowOperation = (newOperation) => {
        const updatedOperations = [
            ...this.state.operations.slice(0, this.state.selectedRow),
            newOperation,
            ...this.state.operations.slice(this.state.selectedRow + 1)
        ];
        this.setState({
            operations: updatedOperations,
            selectedRow: -1,
        });
    };

    handleRunImplementation = (operations) => {
        const {algoBridgeService} = this.props;
        algoBridgeService.runImplementation(JSON.stringify(operations))
        .then((result) => {
            if (Array.isArray(result)) {
                let vars = result;
                let wileVars = "";
                vars.forEach((item) => {
                    wileVars += JSON.stringify(item) + '\n';
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

    handleChangeTitle = (newTitle) => {
        this.setState({
            title: newTitle,
        });
    }

    handleChangeDescription = (newDescription) => {
        this.setState({
            description: newDescription,
        });
    }

    handleSaveAlgo = () => {
        const {algoBridgeService, history} = this.props;
        const algoId = this.algoId;
        algoBridgeService.updateAlgo(
            this.algoId, this.state.title, this.state.description, JSON.stringify(this.state.operations)
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

    render() {
        return (
            <EditAlgoPage
                title={this.state.title}
                description={this.state.description}
                funcs={this.funcs}
                selectedRow={this.state.selectedRow}
                handleRunImplementation={(operations) => this.handleRunImplementation(operations)}
                handleChangeTitle={(newTitle) => this.handleChangeTitle(newTitle)}
                handleChangeDescription={(newDescription) => this.handleChangeDescription(newDescription)}
                handleAddRow={(index) => this.handleAddRow(index)}
                handleRemoveRow={(index) => this.handleRemoveRow(index)}
                handleMoveRowUp={(index) => this.handleMoveRowUp(index)}
                handleMoveRowDown={(index) => this.handleMoveRowDown(index)}
                handleSelectRow={(index) => this.handleSelectRow(index)}
                handleUnselectRow={(index) => this.handleUnselectRow(index)}
                handleSaveRowOperation={(newOperation) => this.handleSaveRowOperation(newOperation)}
                handleChangeRowOperationFromDrag={
                    (newOperation, indexFrom, indexTo) => this.handleChangeRowOperationFromDrag(newOperation, indexFrom, indexTo)
                }
                handleSaveAlgo={() => this.handleSaveAlgo()}
                handleDeleteAlgo={() => this.handleDeleteAlgo()}
                operations={this.state.operations}
                output={this.state.output}
                error={this.state.error}
            />
        );
    }
}


export default compose(
    withAlgoBridgeService(),
    withLoading(),
    withRouter,
)(EditAlgoPageContainer);
