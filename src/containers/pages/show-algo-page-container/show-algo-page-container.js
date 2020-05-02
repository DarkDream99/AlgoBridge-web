import React, {Component} from 'react';
import {compose} from 'redux';
import withAlgoBridgeService from '../../../components/hoc/with-algobridge-service';
import withLoading from '../../../components/hoc/with-loading';
import ShowAlgoPage from '../../../components/pages/show-algo';
import UserAlgosPage from '../../../components/pages/user-algos';


class ShowAlgoPageContainer extends Component {
    constructor(props) {
        super(props);
        this.algoId = props.match.params.id;
        this.state = {
            title: '',
            description: '',
            implementation: [],
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
                    implementation: algo.implementation
                });
                swapLoading(false);
            });
    }

    handleRunImplementation = (event, operations) => {
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

    render() {
        const {algoBridgeService, ...clearProps} = this.props; 
        return (
            <ShowAlgoPage
                title={this.state.title}
                description={this.state.description}
                handleRunImplementation={(event, operations) => this.handleRunImplementation(event, operations)}
                implementation={this.state.implementation}
                output={this.state.output}
                error={this.state.error}
            />
        );
    }
}


export default compose(
    withAlgoBridgeService(),
    withLoading(),
)(ShowAlgoPageContainer);
