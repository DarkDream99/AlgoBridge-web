import React, {Component} from 'react';
import {compose} from 'redux';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import ShowAlgoPage from '../../../components/pages/show-algo';
import VisualizeIDEContainer from '../../visualize-ide';


class ShowAlgoPageContainer extends Component {
    constructor(props) {
        super(props);
        this.algoId = props.match.params.id;
        this.state = {
            title: '',
            description: '',
            implementation: '[]',
            outputRef: React.createRef(),
            output: '',
            error: '',
            isVisual: false,
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
                    implementation: algo.implementation
                });
                swapLoading(false);
            });
    }

    handleRunImplementation = (operations) => {
        const {algoBridgeService} = this.props;
        algoBridgeService.runImplementation(JSON.stringify(operations))
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

    render() {
        const {title, description, implementation, output, error, isVisual} = this.state;

        return (
            <>
                <ShowAlgoPage
                    id={this.algoId}
                    title={title}
                    description={description}
                    handleRunImplementation={(event, operations) => this.handleRunImplementation(event, operations)}
                    implementation={implementation}
                    isVisual={isVisual}
                    handleVisualSwitch={() => this.handleVisualSwitch()}
                    output={output}
                    outputRef={this.state.outputRef}
                    error={error}
                />
                <VisualizeIDEContainer
                    isShow={this.state.isVisual}
                    operations={implementation}
                    activateEndOfVisualize={(resultState) => this.activateEndOfVisualize(resultState)}
                    setError={(errorMessage) => this.setError(errorMessage)}
                />
            </>
        );
    }
}


export default compose(
    withAlgoBridgeService(),
    withLoading(),
)(ShowAlgoPageContainer);
