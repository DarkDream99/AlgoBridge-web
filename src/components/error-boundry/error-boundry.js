import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';


export default class ErrorBoundry extends Component {
    state = {
        hasError: false,
    };

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
        this.setState({
            hasError: true,
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return this.props.children;
    }
}
