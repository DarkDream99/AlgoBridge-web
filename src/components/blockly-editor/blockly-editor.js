import React, {Component} from 'react';
import {compose} from 'redux';
import Blockly from 'blockly';

import withAlgoBridgeService from '../hoc/with-algobridge-service';

import { allowedBlocks } from './block-configs';


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


class BlocklyEditor extends Component {
    workspace = null;
    state = {
        toolboxRef: React.createRef(),
        operationTypes: [],
    }

    constructor(props) {
        super(props);
        this._initOperationBlocks();
        this._loadOperationTypes();
    }

    _initOperationBlocks() {
        for (let key in allowedBlocks) {
            Blockly.Blocks[key] = {
                init: function() {
                    this.jsonInit(allowedBlocks[key])
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.operationTypes.length) {
            this._initWorspace();
        }
    }

    _initWorspace() {
        const onBlockChange = (event) => {
            if (event.type === Blockly.Events.CREATE) {
                const block = this.workspace.getBlockById(event.blockId);
                console.log(`Create new ${block.type}`)
            }
        };

        this.workspace = Blockly.inject('editor', {
            toolbox: this.state.toolboxRef.current,
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

    _loadOperationTypes() {
        const {algoBridgeService} = this.props;
        algoBridgeService.loadOperationTypes().then(
            (data) => {
                this.setState({operationTypes: data})
            }
        );
    }

    render() {
        const allowedOperations = this._makeAllowedOperations();

        if (this.state.operationTypes.length) {
            return (
                <div>
                    {allowedOperations}
                    <div id='editor' style={{width: '100%', height: '600px'}}></div>
                    <button onClick={() => this.convertToCode()}>Convert</button>
                </div>
            );
        }
        return <div>Loading...</div>
    }

    _makeAllowedOperations() {
        const groupList = this._getOperationGroups();

        const builtCategories = groupList.map((group) => {
            const blocks = group.values.map(({title, type}) => {
                if (type in allowedBlocks) {
                    return <Block key={type} type={type} />
                }
                console.log(`${type} does not allowed`);
                return null;
            })
            return (
                <Category key={group.title} name={group.title}>
                    {blocks}
                </Category>
            )
        });

        return (
            <xml xmlns="https://developers.google.com/blockly/xm"
                 is='blockly'
                 id="toolbox"
                 ref={this.state.toolboxRef}
                 style={{ display: 'none' }}
            >
                {builtCategories}
                <Category name='System'>
                    <Block type='algobridge-main' />
                    <Block type='algobridge-empty' />
                </Category>
            </xml>
        );
    }

    _getOperationGroups() {
        let operationGroups = {};
        const {operationTypes} = this.state;

        operationTypes.forEach((item) => {
            let group = item.category.display_name;
            if (!operationGroups.hasOwnProperty(group)) {
                operationGroups[group] = {values: []}
            }
            operationGroups[group].values.push({
                type: item.name,
                title: item.display_name
            });
        });

        let groupList = [];
        for (let groupName in operationGroups) {
            groupList.push({
                title: groupName,
                values: operationGroups[groupName].values,
            })
        }
        return groupList;
    }

    convertToCode = () => {
        const xml = Blockly.Xml.workspaceToDom(this.workspace);
        console.log(Blockly.Xml.domToText(xml));
    }
}


export default compose(
    withAlgoBridgeService(),
)(BlocklyEditor);
