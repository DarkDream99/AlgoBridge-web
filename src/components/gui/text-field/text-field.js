import React, {Component} from 'react';


class TextField extends Component {
    render() {
        const {
            label, placeholder, refValue, classes = ''
        } = this.props;

        let topLabel = '';
        if (label) {
            topLabel = <div style={{ paddingBottom: '10px' }}>{label}</div>
        }

        return (
            <div style={{ paddingBottom: '20px' }}>
                {topLabel}
                <input type='text' placeholder={placeholder} className={classes} ref={refValue} />
            </div>
        )
    }
}


export default TextField
