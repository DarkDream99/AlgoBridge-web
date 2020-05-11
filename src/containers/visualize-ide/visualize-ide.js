import React, {Component} from 'react';
import {compose} from 'redux';
import withAlgoBridgeService from '../../components/hoc/with-algobridge-service';
import VisualizeIDE from '../../components/visualize-ide';


class VisualizeIDEContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visualOperations: [],
            activeOperationIndex: -1,
            displayedRowsCount: 0, 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {algoBridgeService, operations} = this.props;

        const prevOperations = prevProps.operations;
        if (operations === prevOperations)
            return;

        algoBridgeService.runImplementation(operations, 'visual')
            .then((response) => {
                console.log(response);
                this.setState({
                    visualOperations: response['visual_operations']
                });
            });
    }

    handleNextOperation = () => {
        if (this.state.activeOperationIndex < this.state.visualOperations.length - 1)
            this.setState(prevState => {
                const {activeOperationIndex, visualOperations, displayedRowsCount} = prevState;

                return {
                    activeOperationIndex: activeOperationIndex + 1,
                    displayedRowsCount: Math.max(visualOperations[activeOperationIndex + 1].row + 1, displayedRowsCount)
                }
            });
    }

    handleRestartOperations = () => {
        this.setState({
            activeOperationIndex: -1,
            displayedRowsCount: 0
        });
    }
    
    render() {
        const {activeOperationIndex, visualOperations, displayedRowsCount} = this.state;
        return (
            <VisualizeIDE 
                visualOperations={visualOperations}
                activeRow={activeOperationIndex > -1 ? visualOperations[activeOperationIndex].row : -1}
                visualOperationIndex={activeOperationIndex}
                displayedRowsCount={displayedRowsCount}
                handleNextOperation={() => this.handleNextOperation()}
                handleRestartOperations={() => this.handleRestartOperations()}
            />
        )
    }
}


export default compose(
    withAlgoBridgeService(),
)(VisualizeIDEContainer); 
