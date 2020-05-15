import React, {Component} from 'react';


const withErrorIndicator = () => (Wrapper) => {
    return class extends Component {
        state = {
            error: null,
        };

        setError = (error) => {
            this.setState({error});
        };

        render() {
            return <Wrapper {...this.props} error={this.state.error}
                setError={this.setError} />
        }
    }
};

export default withErrorIndicator;
