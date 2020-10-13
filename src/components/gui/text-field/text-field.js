import React, {Component} from 'react';

import './styles/text-field.css';


class TextField extends Component {
    render() {
        const {
            label, placeholder, refValue = null, value = '', classes = '', readOnly = false
        } = this.props;

        let topLabel = '';
        if (label) {
            topLabel = <div style={{ paddingBottom: '10px' }}>{label}</div>
        }

        return (
            <div style={{ paddingBottom: '20px' }}>
                {topLabel}
                <input type='text'
                       defaultValue={value}
                       placeholder={placeholder}
                       className={classes}
                       ref={refValue}
                       readOnly={readOnly}
                />
            </div>
        )
    }
}


export default TextField
