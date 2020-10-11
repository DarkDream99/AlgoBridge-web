import React, {Component} from 'react';

import './styles/textarea-field.css';


class TextareaField extends Component {
    render() {
        const {label, value = ''} = this.props;

        let topLabel = '';
        if (label) {
            topLabel = <div style={{paddingBottom: '10px'}}>{label}</div>
        }

        let textarea = this._makeWritableTextarea();
        if (value)
            textarea = this._makeFilledTextarea(value);

        return (
            <div style={{paddingBottom: '20px'}}>
                {topLabel}
                {textarea}
            </div>
        )
    }

    _makeWritableTextarea() {
        const {refValue, rows = 5, readOnly = false, classes = ''} = this.props;
        return (
            <textarea readOnly={readOnly} className={classes} rows={rows} ref={refValue} />
        );
    }

    _makeFilledTextarea(value) {
        const {refValue, rows = 5, readOnly = false, classes = ''} = this.props;
        return (
            <textarea readOnly={readOnly} className={classes} rows={rows} value={value} ref={refValue} />
        );
    }
}


export default TextareaField;
