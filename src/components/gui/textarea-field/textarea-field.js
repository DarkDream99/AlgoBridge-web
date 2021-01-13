import React, {Component} from 'react';

import './textarea-field.scss';


class TextareaField extends Component {
    render() {
        const {label, refValue = null, value = '', rows = 5, readOnly = false, classes = '', onChange = null} = this.props;

        let topLabel = '';
        if (label) {
            topLabel = <div style={{paddingBottom: '10px'}}>{label}</div>
        }

        return (
            <div style={{paddingBottom: '1.5%'}}>
                {topLabel}
                <textarea readOnly={readOnly} className={classes} rows={rows} defaultValue={value} ref={refValue} onChange={onChange} />
            </div>
        )
    }
}


export default TextareaField;
