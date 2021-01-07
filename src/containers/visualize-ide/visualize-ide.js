import React, {Component} from 'react';
import {compose} from 'redux';
import withAlgoBridgeService from '../../components/hoc/with-algobridge-service';
import VisualizeIDE from '../../components/visualize-ide';


class VisualizeIDEContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resultState: [],
            visualOperations: [],
            activeOperationIndex: -1,
            displayedRowsCount: 0,
            enableNext: true,
        }
    }

    componentDidMount() {
        const {algoBridgeService, operations, setError} = this.props;
        algoBridgeService.runImplementation(operations, 'visual')
            .then((response) => {
                if (response['status'] === 400) {
                    setError(response['error']);
                } else {
                    this.setState({
                        visualOperations: response['visual_operations'],
                        resultState: response['state']
                    });
                }
            });
    }

    componentDidUpdate(prevProps) {
        const {algoBridgeService, operations, isShow, setError} = this.props;

        if (!isShow && prevProps.isShow) {
            this.setState({
                activeOperationIndex: -1,
                displayedRowsCount: 0
            });
        }

        const prevOperations = prevProps.operations;
        if (operations === prevOperations)
            return;

        algoBridgeService.runImplementation(operations, 'visual')
            .then((response) => {
                if (response['status'] === 400) {
                    setError(response['error']);
                } else {
                    this.setState({
                        visualOperations: response['visual_operations'],
                        resultState: response['state']
                    });
                }
            });
    }

    handleNextOperation = () => {
        const {activateEndOfVisualize} = this.props;
        if (this.state.activeOperationIndex < this.state.visualOperations.length - 1) {
            this.setState(prevState => {
                const {activeOperationIndex, visualOperations, displayedRowsCount} = prevState;

                return {
                    activeOperationIndex: activeOperationIndex + 1,
                    displayedRowsCount: Math.max(visualOperations[activeOperationIndex + 1].row + 1, displayedRowsCount)
                }
            });
        } else {
            this.setState({
                enableNext: false
            }, () => {
                activateEndOfVisualize(this.state.resultState);
            })
        }
    }

    handleRestartOperations = () => {
        this.setState({
            activeOperationIndex: -1,
            displayedRowsCount: 0,
            enableNext: true,
        });
    }

    render() {
        const {activeOperationIndex, visualOperations, displayedRowsCount} = this.state;
        const {isShow, operations} = this.props;
        return (
            <VisualizeIDE
                visualOperations={visualOperations}
                activeRow={activeOperationIndex > -1 ? visualOperations[activeOperationIndex].row : -1}
                operations={operations}
                visualOperationIndex={activeOperationIndex}
                displayedRowsCount={displayedRowsCount}
                isShow={isShow}
                enableNext={this.state.enableNext}
                handleNextOperation={() => this.handleNextOperation()}
                handleRestartOperations={() => this.handleRestartOperations()}
            />
        )
    }
}


export default compose(
    withAlgoBridgeService(),
)(VisualizeIDEContainer);
