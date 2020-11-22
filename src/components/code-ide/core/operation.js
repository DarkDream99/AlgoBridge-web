export const OperationTypes = Object.freeze({
    EMPTY: 'empty',

    VARIABLE: 'variable',
    NUMBER: 'number',
    ARRAY: 'array',
    ASSIGN: 'assign',

    LARGER: 'larger',
    LARGER_EQUAL: 'larger-equal',
    LESS: 'less',
    LESS_EQUAL: 'less-equal',
    EQUAL: 'equal',
    AND_LOGIC: 'and-logic',
    OR_LOGIC: 'or-logic',

    SUM: 'sum',
    SUBTRACTION: 'subtraction',
    MULTIPLICATION: 'multiplication',
    DIVISION: 'division',

    GET_ITEM: 'get-item',
    SET_ITEM: 'set-item',

    CONDITION: 'condition',
    END_CONDITION: 'end-condition',
    FOR_LOOP: 'for-loop',
    END_FOR_LOOP: 'end-for-loop',
});


class Operation {

    constructor(type=OperationTypes.EMPTY, parameter={}, index=-1) {
        this.type = type;
        this.parameter = parameter;
        this.index = index;
    }

    static parseCodedOperation() {

    }
}


export default Operation;
