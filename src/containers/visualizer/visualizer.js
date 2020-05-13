import React, {Component} from 'react';
import * as d3 from 'd3';

import Visualizer from '../../components/visualizer'


class VisualizerContainer extends Component {
    constructor(props) {
        super(props);

        this.operationId = `simple-assign-operation-row-${props.visualOperation.row}`;
        this.valueAId = `simple-assign-value-a-row-${props.visualOperation.row}`;
        this.varAId = `simple-assign-variable-a-row-${props.visualOperation.row}`;
        this.valueBId = `simple-assign-value-b-row-${props.visualOperation.row}`;
        this.varBId = `simple-assign-variable-b-row-${props.visualOperation.row}`;

        this.RED_COLOR = 'red';
        this.GREEN_COLOR = 'green';
        this.BLACK_COLOR = 'black';

        this.state = {
            boardRef: React.createRef(),
        };
    }

    componentDidMount() {
        const {isActive, visualOperation} = this.props;
        if (isActive) {
            this.state.boardRef.current.scrollIntoView();
            this.showOperation(visualOperation);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {isActive, isClear, visualOperation} = this.props;

        if (prevState.operation === visualOperation)
            return;

        if (isActive) {
            d3.select(`#${this.operationId}`).remove();
            this.state.boardRef.current.scrollIntoView();
            this.showOperation(visualOperation);
        }

        if (isClear) {
            d3.select(`#${this.operationId}`).remove();
        }
    }

    showLine = ({containerId, startPosition, endPosition, color, width}) => {
        let container = d3.select(`#${containerId}`);
    
        if (!color) {
            color = this.BLACK_COLOR;
        }
        if (!width) {
            width = 2
        }

        container.append('line')
            .attr('x1', startPosition.x).attr('y1', startPosition.y)
            .attr('x2', endPosition.x).attr('y2', endPosition.y)
            .attr('stroke', color).attr('stroke-width', width);
    }

    showText = ({containerId, position, size, text}) => {
        let container = d3.select(`#${containerId}`);

        if (!text) {
            text = '0.35em';
        }

        container.append('text')
            .attr('x', position.x)
            .attr('y', position.y)
            .attr('dy', size)
            .text(text)
    }

    showItem = ({position, width, height, label, itemId, containerId}) => {
        let border = d3.select(`#${containerId}`);
        border.append('g').attr('id', itemId);

        let itemContainer = d3.select(`#${itemId}`);
        itemContainer
            .append('rect')
                .attr('x', position.x)
                .attr('y', position.y - 20)
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'orange')
                .attr('stroke', 'black')
            .transition()
            .duration(750)
            .attr('y', position.y);

        itemContainer
            .append('text')
                .attr('y', position.y + height / 2 - 20)
                .attr('dy', '0.35em')
                .attr('x', position.x + 5)
                .text(label)
            .transition()
            .duration(750)
            .attr('y', position.y + (height / 2))
    }

    moveItem = ({position, height, containerId, deltaPosition}) => {
        let container = d3.select(`#${containerId}`);

        container.select('rect')
            .transition().delay(700).duration(400)
            .attr('y', position.y + deltaPosition.y)
            .attr('x', position.x + deltaPosition.x)

        container.select('text')
            .transition().delay(700).duration(400)
            .attr('y', position.y + (height / 2) + deltaPosition.y)
            .attr('x', position.x + deltaPosition.x + 5)
    }

    removeItem = ({position, height, containerId}) => {
        let container = d3.select(`#${containerId}`);

        container.selectAll('rect')
            .transition().duration(400).delay(400)
            .attr('y', position.y + 50)
            .remove();

        container.selectAll('text')
            .transition().duration(400).delay(400)
            .attr('y', position.y + (height / 2) + 50)
            .remove();

        container.selectAll('line')
            .transition().duration(400).delay(400)
            .attr('y1', position.y + (height / 2) + 80)
            .attr('y2', position.y + (height / 2) + 80)
            .remove();

        container.selectAll('g').transition().delay(800).remove();
        container.transition().delay(800).remove();
    }

    showVariable = ({position, width, height, name, containerId}) => {
        this.showLine({
            containerId: containerId,
            startPosition: {x: position.x, y: position.y},
            endPosition: {x: position.x + width, y: position.y},
            color: this.RED_COLOR, width: 2
        });

        this.showLine({
            containerId: containerId,
            startPosition: {x: position.x, y: position.y},
            endPosition: {x: position.x - 10, y: position.y - height},
            color: this.RED_COLOR, width: 2
        });

        this.showLine({
            containerId: containerId,
            startPosition: {x: position.x + width, y: position.y},
            endPosition: {x: position.x + width + 10, y: position.y - height},
            color: this.RED_COLOR, width: 2
        });

        this.showText({
            containerId: containerId,
            position: {x: position.x + 5, y: position.y + 10},
            size: '0.35em',
            text: name
        });
    }

    showSimpleAssign = ({name, oldValue, newValue}) => {
        let board = d3.select(`#${this.state.boardRef.current.id}`);
        board.append('g').attr('id', this.operationId);

        if (oldValue !== '') {
            this.showItem({
                position: {x: -180, y: 20},
                width: 50,
                height: 50,
                label: oldValue,
                containerId: this.operationId,
                itemId: this.valueAId,
            });
        }

        this.showItem({
            position: {x: -100, y: 20},
            width: 50,
            height: 50,
            label: newValue,
            containerId: this.operationId,
            itemId: this.valueBId,
        });

        this.showVariable({
            position: {x: -185, y: 75},
            width: 60, height: 60,
            name: name,
            containerId: this.operationId,
        });

        this.moveItem({
            position: {x: -100, y: 20},
            height: 50,
            containerId: this.valueBId,
            deltaPosition: {x: -80, y: 0}
        });

        if (oldValue !== '') {
            this.removeItem({
                position: {x: -65, y: 20},
                height: 50,
                containerId: this.valueAId,
            });
        }
    }

    showAssignFromVariable = ({nameA, valueA, nameB, valueB}) => {
        let board = d3.select(`#${this.state.boardRef.current.id}`);
        board.append('g').attr('id', this.operationId);

        if (valueA !== '') {
            this.showItem({
                position: {x: -180, y: 20},
                width: 50,
                height: 50,
                label: valueA,
                containerId: this.operationId,
                itemId: this.valueAId,
            });
        }

        this.showVariable({
            position: {x: -185, y: 75},
            width: 60, height: 60,
            name: nameA,
            containerId: this.operationId,
        });

        for (let i = 0; i < 2; ++i)
            this.showItem({
                position: {x: -65, y: 20},
                width: 50,
                height: 50,
                label: valueB,
                containerId: this.operationId,
                itemId: this.valueBId,
            });

        this.showVariable({
            position: {x: -70, y: 75},
            width: 60, height: 60,
            name: nameB,
            containerId: this.operationId,
        });

        this.moveItem({
            position: {x: -65, y: 20},
            height: 50,
            containerId: this.valueBId,
            deltaPosition: {x: -115, y: 0}
        });

        if (valueA !== '') {
            this.removeItem({
                position: {x: -65, y: 20},
                height: 50,
                containerId: this.valueAId,
            });
        }
    }

    showCondition = ({row, value, isCorrect}) => {
        let board = d3.select(`#${this.state.boardRef.current.id}`);
        board.append('g').attr('id', this.operationId);

        this.showItem({
            position: {x: 0, y: 20},
            width: 60, height: 60,
            label: value,
            containerId: this.operationId,
            itemId: this.valueAId
        });

        this.showLine({
            containerId: this.operationId,
            startPosition: {x: 0, y: 37},
            endPosition: {x: -30, y: 37},
            color: this.BLACK_COLOR
        });

        this.showLine({
            containerId: this.operationId,
            startPosition: {x: 60, y: 37},
            endPosition: {x: 90, y: 37},
            color: this.BLACK_COLOR
        });

        if (isCorrect === '+') {
            this.showLine({
                containerId: this.operationId,
                startPosition: {x: 90, y: 37},
                endPosition: {x: 90, y: 90},
                color: this.GREEN_COLOR, width: 5
            });
        } else {
            this.showLine({
                containerId: this.operationId,
                startPosition: {x: -30, y: 37},
                endPosition: {x: -30, y: 90},
                color: this.RED_COLOR, width: 5
            });
        }
    }

    showOperation = (operation) => {
        switch (operation.type) {
            case 'simple_assign':
                this.showSimpleAssign(operation);
                break;
            case 'assign_from_variable':
                this.showAssignFromVariable(operation);
                break;
            case 'condition':
                this.showCondition(operation);
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Visualizer
                borderRef={this.state.boardRef}
                rowNumber={this.props.rowNumber}
                isActive={this.props.isActive}
            />
        );
    }
}


export default VisualizerContainer;
