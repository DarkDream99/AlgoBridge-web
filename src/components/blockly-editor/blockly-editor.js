import React, {Component} from 'react';
import Blockly from 'blockly';


const Block = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("block", props, children);
};

const Category = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("category", props, children);
};

// blockly blocks
const assignBlock = {
    type: "assign",
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

const variableBlock = {
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

const numberBlock = {
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
}

const arrayBlock = {
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
}

const emptyBlock = {
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
}

const binaryMathBlock = {
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
}

const binaryLogicBlock = {
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
}

const logicNotBlock = {
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
}

const forLoopBlock = {
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
}

const conditionIfBlock = {
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
}
const getElementByIndexBlock = {
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
}

const setElementByIndex = {
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
}

const mainBlock = {
    type: "algobridge_main_block",
    message0: "main %1",
    args0: [
        {
            type: "input_statement",
            name: "body"
        }
    ],
    colour: 230,
    tooltip: null,
    helpUrl: null
}

class BlocklyEditor extends Component {
    workspace = null;

    constructor(props) {
        super(props);

        // initialize blocks
        Blockly.Blocks['algobridge-assign'] = {
            init: function() {
                this.jsonInit(assignBlock);
            }
        };

        Blockly.Blocks['algobridge-variable'] = {
            init: function() {
                this.jsonInit(variableBlock);
            }
        };

        Blockly.Blocks['algobridge-number'] = {
            init: function() {
                this.jsonInit(numberBlock);
            }
        };

        Blockly.Blocks['algobridge-array'] = {
            init: function() {
                this.jsonInit(arrayBlock);
            }
        };

        Blockly.Blocks['algobridge-empty'] = {
            init: function() {
                this.jsonInit(emptyBlock);
            }
        };

        Blockly.Blocks['algobridge-binary-math'] = {
            init: function() {
                this.jsonInit(binaryMathBlock);
            }
        };

        Blockly.Blocks['algobridge-binary-logic'] = {
            init: function() {
                this.jsonInit(binaryLogicBlock);
            }
        };

        Blockly.Blocks['algobridge-logic-not'] = {
            init: function() {
                this.jsonInit(logicNotBlock);
            }
        };

        Blockly.Blocks['algobridge-for-loop'] = {
            init: function() {
                this.jsonInit(forLoopBlock);
            }
        };

        Blockly.Blocks['algobridge-condition-if'] = {
            init: function() {
                this.jsonInit(conditionIfBlock);
            }
        };

        Blockly.Blocks['algobridge-get-element-by-index'] = {
            init: function() {
                this.jsonInit(getElementByIndexBlock);
            }
        };

        Blockly.Blocks['algobridge-set-element-by-index'] = {
            init: function() {
                this.jsonInit(setElementByIndex);
            }
        };

        Blockly.Blocks['algobridge-main'] = {
            init: function() {
                this.jsonInit(mainBlock);
            }
        };
    }

    componentDidMount() {
        const onBlockChange = (event) => {
            if (event.type === Blockly.Events.CREATE) {
                const block = this.workspace.getBlockById(event.blockId);
                console.log(`Create new ${block.type}`)
            }
        };

        this.workspace = Blockly.inject('editor', {
            toolbox: document.getElementById('toolbox'),
            move: {
                scrollbars: true,
                drag: true,
                wheel: false
            },
            grid: {
                spacing: 20,
                length: 2,
                colour: 'blue',
                snap: true,
            }
        });
        this.workspace.addChangeListener(onBlockChange);
    }

    render() {
        return (
            <div>
                <xml xmlns="https://developers.google.com/blockly/xm" is='blockly' id="toolbox" style={{ display: 'none' }}>
                    <Category name='Algo variables' colour='230'>
                        <Block type='algobridge-assign' />
                        <Block type='algobridge-variable' />
                    </Category>
                    <Category name='Primitives' colour='0'>
                        <Block type='algobridge-number' />
                        <Block type='algobridge-array' />
                        <Block type='algobridge-empty' />
                    </Category>
                    <Category name='Math' colour='45'>
                        <Block type='algobridge-binary-math' />
                    </Category>
                    <Category name='Logic' colour='30'>
                        <Block type='algobridge-binary-logic' />
                        <Block type='algobridge-logic-not' />
                    </Category>
                    <Category name='Constructions' colour='105'>
                        <Block type='algobridge-for-loop' />
                        <Block type='algobridge-condition-if' />
                        <Block type='algobridge-get-element-by-index' />
                        <Block type='algobridge-set-element-by-index' />
                    </Category>

                    <Category name='Core'>
                        <Block type='algobridge-main' />
                    </Category>
                </xml>
                <div id='editor' style={{width: '100%', height: '600px'}}></div>
                <button onClick={() => this.convertToCode()}>Convert</button>
            </div>
        );
    }

    convertToCode = () => {
        const xml = Blockly.Xml.workspaceToDom(this.workspace);
        console.log(Blockly.Xml.domToText(xml));
    }
}


export default BlocklyEditor;
