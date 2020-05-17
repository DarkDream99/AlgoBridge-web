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

    handleVisualSwitch = () => {
        this.setState((currState) => {
            const {isVisual} = currState;
            return {
                isVisual: !isVisual
            }
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
                    error={error}
                />
                <VisualizeIDEContainer
                    isShow={this.state.isVisual}
                    operations={implementation}
                />
            </>
        );
    }
}


export default compose(
    withAlgoBridgeService(),
    withLoading(),
)(ShowAlgoPageContainer);
