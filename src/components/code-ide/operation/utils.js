const isBlockOperation = (operation) => {
    const operationType = operation['type'];

    return (
        operationType === 'condition' || operationType === 'for-loop'
    );
}


const isEndBlockOperation = (operation) => {
    const operationType = operation['type'];

    return (
        operationType === 'end-condition' || operationType === 'end-for-loop'
    );
}


export {
    isBlockOperation, isEndBlockOperation
};
