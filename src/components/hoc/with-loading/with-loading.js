import React, {Component} from 'react';


const withLoading = () => (Wrapper) => {
    const Loader = class extends Component {
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
    };
    Loader.displayName = 'Loader';
    return Loader;
};


export default withLoading;
