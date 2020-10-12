import React, {Component} from 'react';

import './styles/textarea-field.css';


class TextareaField extends Component {
    render() {
        const {label, refValue = null, value = '', rows = 5, readOnly = false, classes = ''} = this.props;

        let topLabel = '';
        if (label) {
            topLabel = <div style={{paddingBottom: '10px'}}>{label}</div>
        }

        return (
            <div style={{paddingBottom: '20px'}}>
                {topLabel}
                <textarea readOnly={readOnly} className={classes} rows={rows} defaultValue={value} ref={refValue} />
            </div>
        )
    }
}


export default TextareaField;
