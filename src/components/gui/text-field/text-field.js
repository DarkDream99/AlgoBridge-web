import React, {Component} from 'react';

import './style/text-field.css';


class TextField extends Component {
  render() {
    const {placeholder, classes, valueRef} = this.props;
    return (
      <input type='text' placeholder={placeholder} className={classes} ref={valueRef} />
    )
  }
}


export default TextField
