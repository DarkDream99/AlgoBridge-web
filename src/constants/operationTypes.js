const operationTypes = {
    ASSIGN: "assign",
    LARGER: "larger",
    LARGE_EQUAL: "larger-equal",
    LESS: "less",
    LESS_EQUAL: "less-equal",
    EQUAL: "equal",
    AND_LOGIC: "and-logic",
    OR_LOGIC: "or-logic",
    NUMBER: "number",
    VARIABLE: "variable",
    FOR_LOOP: "for-loop",
    END_FOR_LOOP: "end-for-loop",
    ARRAY: "array",
    SUM: "sum",
    SUBSTRACTION: "subtraction",
    MULTIPLICATION: "multiplication",
    DIVISION: "division",
    FUNCTION: "function",
    CONDITION: "condition",
    END_CONDITION: "end-condition",
    GET_ITEM: "get-item",
    SET_ITEM: "set-item",
    EMPTY: "empty"
}

export default operationTypes;