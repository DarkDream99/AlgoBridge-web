import React, {Component} from 'react';

import './text-field.scss';


class TextField extends Component {
    render() {
        const {
            label, placeholder, refValue = null, value = '', classes = '', readOnly = false, onChange = null,
        } = this.props;

        let topLabel = '';
        if (label) {
            topLabel = <div style={{ paddingBottom: '10px' }}>{label}</div>
        }

        return (
            <div style={{ paddingBottom: '1.5%' }}>
                {topLabel}
                <input type='text'
                       defaultValue={value}
                       placeholder={placeholder}
                       className={classes}
                       ref={refValue}
                       readOnly={readOnly}
                       onChange={onChange}
                />
            </div>
        )
    }
}


export default TextField
