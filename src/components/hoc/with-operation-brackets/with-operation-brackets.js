import React, {Component} from 'react';


const withOperationBrackets = () => (Wrapper) => {
    const OperationBrackets = class extends Component {
        render() {
            const {left, right} = this.props; 
            const singleOperations = ['number', 'variable']
            const brackets = {
                leftStart: singleOperations.includes(left.type) ? null : '(',
                leftEnd: singleOperations.includes(left.type) ? null : ')',
                rightStart: singleOperations.includes(right.type) ? null : '(',
                rightEnd: singleOperations.includes(right.type) ? null: ')',
            }
            return (<Wrapper {...this.props} brackets={brackets} />);
        }
    };
    OperationBrackets.displayName = 'OperationBrackets';
    return OperationBrackets;
}


export default withOperationBrackets;
