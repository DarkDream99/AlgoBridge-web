import React, {Component} from 'react';


const withLoading = () => (Wrapper) => {
    return class extends Component {
        state = {
            loading: false,
        };

        swapLoading = (mode) => {
            this.setState({
                loading: mode,
            });
        };

        render() {
            return (
                <Wrapper {...this.props} loading={this.state.loading} swapLoading={this.swapLoading} />
            );
        }
    }
};

export default withLoading;
