export const assignBlock = {
    type: "algobridge-assign",
    message0: "set %1 to %2",
    args0: [
        {
            type: "input_value",
            name: "variable",
            align: "CENTRE"
        },
        {
            type: "input_value",
            name: "value",
            align: "CENTRE"
        }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: "Assign variable ",
    helpUrl: "https://en.wikipedia.org/wiki/Assignment_(computer_science)"
};


export const variableBlock = {
    type: "algobridge-variable",
    message0: "%1",
    args0: [
        {
            type: "field_input",
            name: "name",
            text: ""
        }
    ],
    inputsInline: true,
    output: null,
    tooltip: "Variable block",
    helpUrl: ""
};


export const numberBlock = {
    type: "algobridge_number",
    message0: "%1",
    args0: [
        {
            type: "field_number",
            name: "value",
            value: 0,
            precision: 1
        }
    ],
    output: null,
    colour: 0,
    tooltip: 'Number block',
    helpUrl: null
};


export const arrayBlock = {
    type: "algobridge_array",
    message0: "Array( %1 Size %2 )",
    args0: [
        {
            type: "input_dummy"
        },
        {
            type: "field_number",
            name: "size",
            value: 0,
            min: 1
        }
    ],
    inputsInline: true,
    output: null,
    colour: 0,
    tooltip: null,
    helpUrl: null
};


export const emptyBlock = {
    type: "algobridge_empty",
    message0: " %1",
    args0: [
        {
            type: "input_dummy"
        }
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 60,
    tooltip: null,
    helpUrl: null
};


export const sumBlock = {
    type: "algobridge_sum",
    message0: "%1 + %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 45,
    tooltip: null,
    helpUrl: null
};


export const subtractionBlock = {
    type: "algobridge_subtraction",
    message0: "%1 - %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 45,
    tooltip: null,
    helpUrl: null
};


export const multiplicationBlock = {
    type: "algobridge_multiplication",
    message0: "%1 * %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 45,
    tooltip: null,
    helpUrl: null
};


export const divisionBlock = {
    type: "algobridge_division",
    message0: "%1 / %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 45,
    tooltip: null,
    helpUrl: null
};


export const binaryMathBlock = {
    type: "algobridge_binary_math",
    message0: "%1 %2 %3",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "field_dropdown",
            name: "name",
            options: [
                [ "+", "sum" ],
                [ "-", "subtraction" ],
                [ "*", "multiplication" ],
                [ "/", "division" ]
            ]
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 45,
    tooltip: null,
    helpUrl: null
};


export const binaryLogicBlock = {
    type: "algobridge_binary_logic",
    message0: "%1 %2 %3",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "field_dropdown",
            name: "name",
            options: [
                [ "and", "and" ],
                [ "or", "or" ],
            ]
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const logicAndBlock = {
    type: "algobridge_logic_and",
    message0: "%1 and %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const logicOrBlock = {
    type: "algobridge_logic_or",
    message0: "%1 or %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            "type": "input_value",
            "name": "right"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const logicNotBlock = {
    type: "algobridge_logic_not",
    message0: "not %1",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const lessConditionBlock = {
    type: "algobridge_less_condition",
    message0: "%1 < %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "input_value",
            name: "right"
        },
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const lessEqualConditionBlock = {
    type: "algobridge_less_equal_condition",
    message0: "%1 ≤ %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "input_value",
            name: "right"
        },
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const largerConditionBlock = {
    type: "algobridge_larger_condition",
    message0: "%1 > %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "input_value",
            name: "right"
        },
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const largerEqualConditionBlock = {
    type: "algobridge_larger_equal_condition",
    message0: "%1 ≥ %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "input_value",
            name: "right"
        },
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const equalConditionBlock = {
    type: "algobridge_equal_condition",
    message0: "%1 = %2",
    args0: [
        {
            type: "input_value",
            name: "left"
        },
        {
            type: "input_value",
            name: "right"
        },
    ],
    inputsInline: true,
    output: null,
    colour: 30,
    tooltip: null,
    helpUrl: null
};


export const forLoopBlock = {
    type: "algobridge_for_loop",
    message0: "for %1 from %2 to %3 %4",
    args0: [
        {
            type: "input_value",
            name: "variable"
        },
        {
            type: "input_value",
            name: "from"
        },
        {
            type: "input_value",
            name: "to"
        },
        {
            type: "input_statement",
            name: "for_loop_body"
        }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 105,
    tooltip: 'For loop block',
    helpUrl: null
};

export const conditionIfBlock = {
    type: "algobridge_condition_if",
    message0: "if %1 then %2 else %3",
    args0: [
        {
            type: "input_value",
            name: "variable"
        },
        {
            type: "input_statement",
            name: "then"
        },
        {
            type: "input_statement",
            name: "else"
        }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 105,
    tooltip: 'For loop block',
    helpUrl: null
};


export const getElementByIndexBlock = {
    type: "algobridge_get_item_by_index",
    message0: "%1 [ %2 ]",
    args0: [
        {
            "type": "input_value",
            "name": "item"
        },
        {
            "type": "input_value",
            "name": "index"
        }
    ],
    inputsInline: true,
    output: null,
    colour: 105,
    tooltip: 'Getting element by index',
    helpUrl: null
};


export const setElementByIndexBlock = {
    type: "algobridge_set_element_by_index",
    message0: "%1 [ %2 ] = %3",
    args0: [
        {
            type: "input_value",
            name: "item"
        },
        {
            type: "input_value",
            name: "index"
        },
        {
            type: "input_value",
            name: "value"
        }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 105,
    tooltip: 'Setting new value to the item by index',
    helpUrl: null
};


export const mainBlock = {
    type: "algobridge_main_block",
    message0: "Start algorithm from here",
    args0: [ ],
    nextStatement: null,
    colour: 270,
    tooltip: 'Must be only one start point inside the algorithm!',
    helpUrl: null
};


export const allowedBlocks = {
    'assign': assignBlock,
    'variable': variableBlock,
    'number': numberBlock,
    'array': arrayBlock,
    'algobridge-empty': emptyBlock,
    'sum': sumBlock,
    'subtraction': subtractionBlock,
    'multiplication': multiplicationBlock,
    'division': divisionBlock,
    'logic-and': logicAndBlock,
    'logic-or': logicOrBlock,
    'logic-not': logicNotBlock,
    'less': lessConditionBlock,
    'less-equal': lessEqualConditionBlock,
    'larger': largerConditionBlock,
    'larger-equal': largerEqualConditionBlock,
    'equal': equalConditionBlock,
    'for-loop': forLoopBlock,
    'condition': conditionIfBlock,
    'get-element-by-index': getElementByIndexBlock,
    'set-element-by-index': setElementByIndexBlock,
    'algobridge-main': mainBlock
};
