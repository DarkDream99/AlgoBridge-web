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

    shouldComponentUpdate(nextProps) {
        const {visualOperation, isActive} = this.props;
        if (
            JSON.stringify(nextProps.visualOperation) === JSON.stringify(visualOperation)
                && nextProps.isActive === isActive
        )
            return false;
        return true;
    }

    componentDidUpdate() {
        const {isActive, isClear, visualOperation} = this.props;

        if (isActive) {
            d3.select(`#${this.operationId}`).remove();
            this.state.boardRef.current.scrollIntoView({block: 'center', behavior: 'smooth'});
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
        const d3time = itemContainer.transition().duration(750);
        itemContainer
            .append('rect')
                .attr('x', position.x)
                .attr('y', position.y - 20)
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'orange')
                .attr('stroke', 'black')
            .transition(d3time)
            .attr('y', position.y);

        itemContainer
            .append('text')
                .attr('y', position.y + height / 2 - 20)
                .attr('dy', '0.35em')
                .attr('x', position.x + 5)
                .text(label)
            .transition(d3time)
            .attr('y', position.y + (height / 2))
    }

    moveItem = ({position, height, containerId, deltaPosition}) => {
        let container = d3.select(`#${containerId}`);
        const d3time = container.transition().duration(400);

        container.select('rect')
            .transition(d3time).delay(700)
            .attr('y', position.y + deltaPosition.y)
            .attr('x', position.x + deltaPosition.x)

        container.select('text')
            .transition(d3time).delay(700)
            .attr('y', position.y + (height / 2) + deltaPosition.y)
            .attr('x', position.x + deltaPosition.x + 5)
    }

    removeItem = ({position, height, containerId}) => {
        let container = d3.select(`#${containerId}`);
        const d3time = container.transition().duration(700);

        container.selectAll('rect')
            .attr('x', (value, index) => position.x + index * 50)
            .transition(d3time)
            .attr('y', position.y + 50)
            .remove();

        container.selectAll('text')
            .attr('x', (value, index) => position.x + index * 50)
            .transition(d3time)
            .attr('y', position.y + (height / 2) + 50)
            .remove();

        container.selectAll('line')
            .transition(d3time)
            .attr('y1', position.y + (height / 2) + 80)
            .attr('y2', position.y + (height / 2) + 80)
            .remove();

        container.selectAll('g').transition().delay(800).remove();
        container.transition().delay(800).remove();
    }

    showArray = ({position, width, height, containerId, array, itemId}) => {
        let container = d3.select(`#${containerId}`);
        const d3time = container.transition().duration(750);
        const itemContainer = container.append('g').attr('id', itemId);

        itemContainer.selectAll('rect')
            .data(array, array => array)
            .join(
                enter => enter.append('rect')
                    .attr('x', position.x)
                    .call(enter => enter.transition(d3time)
                        .attr('x', (index) => index * width)
                    )
                    .attr('y', position.y)
                    .attr('width', width)
                    .attr('height', height)
                    .attr('fill', 'orange')
                    .attr('stroke', 'black'),
                update => update.attr('fill', 'orange'),
                exit => exit
                    .attr('fill', 'red')
                    .call( exit => exit.transition(d3time)
                        .remove()
                    )
            );

        itemContainer.selectAll('text')
            .data(array, array => array)
            .join(
                enter => enter.append('text')
                    .attr('x', position.x)
                    .call(enter => enter.transition(d3time)
                        .attr('x', (index) => index * width + 5)
                    )
                    .attr('y', position.y)
                    .attr('dy', '1.35em')
                    .text((value) => value),
                update => update.attr('fill', 'orange'),
                exit => exit
                    .call( exit => exit.transition(d3time)
                        .remove()
                    )
            );
    }

    moveArray = ({position, containerId, deltaPosition}) => {
        let container = d3.select(`#${containerId}`);
        const d3time = container.transition().duration(400);

        container.selectAll('rect')
            .transition(d3time).delay(700)
            .attr('y', position.y + deltaPosition.y)
            .attr('x', (value, index) => position.x + index * 50 + deltaPosition.x)

        container.selectAll('text')
            .transition(d3time).delay(700)
            .attr('y', position.y + deltaPosition.y)
            .attr('x', (index) => position.x + index * 50 + deltaPosition.x + 5)
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

        let oldValueSource;
        let oldCount = 1;
        if (oldValue !== '') {
            oldValueSource = JSON.parse(oldValue);
            if (Array.isArray(oldValueSource)) {
                oldCount = Math.max(oldValueSource.length, oldCount);
            }
            if (Array.isArray(oldValueSource)) {
                this.showArray({
                    position: {x: -180, y: 20},
                    width: 50, height: 50,
                    containerId: this.operationId,
                    array: oldValueSource,
                    itemId: this.valueAId
                });
            } else {
                this.showItem({
                    position: {x: -180, y: 20},
                    width: 50,
                    height: 50,
                    label: oldValue,
                    containerId: this.operationId,
                    itemId: this.valueAId,
                });
            }
        }

        const newValueSource = JSON.parse(newValue);

        if (Array.isArray(newValueSource)) {
            this.showArray({
                position: {x: -180 + oldCount * 90, y: 20},
                width: 50, height: 50,
                containerId: this.operationId,
                array: newValueSource,
                itemId: this.valueBId
            });
        } else {
            this.showItem({
                position: {x: -180 + oldCount * 90, y: 20},
                width: 50,
                height: 50,
                label: newValue,
                containerId: this.operationId,
                itemId: this.valueBId,
            });
        }

        let newCount = 1;
        if (Array.isArray(newValueSource)) {
            newCount = Math.max(newCount, newValueSource.length);
        }

        const countItems = Math.max(newCount, oldCount);
        const width = 60;

        this.showVariable({
            position: {x: -185, y: 75},
            width: width * countItems, height: 60,
            name: name,
            containerId: this.operationId,
        });

        if (Array.isArray(newValueSource)) {
            this.moveArray({
                position: {x: -180 + oldCount * 90, y: 20},
                height: 50,
                containerId: this.valueBId,
                deltaPosition: {x: -oldCount * 90, y: 0}
            });
        } else {
            this.moveItem({
                position: {x: -180 + oldCount * 90, y: 20},
                height: 50,
                containerId: this.valueBId,
                deltaPosition: {x: -oldCount * 90, y: 0}
            });
        }

        if (oldValue !== '') {
            this.removeItem({
                position: {x: -185, y: 20},
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
                position: {x: -180, y: 20},
                height: 50,
                containerId: this.valueAId,
            });
        }
    }

    showCondition = ({value, isCorrect}) => {
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
        const {targetOperation} = this.props;
        return (
            <Visualizer
                targetOperation={targetOperation}
                borderRef={this.state.boardRef}
                rowNumber={this.props.rowNumber}
                isActive={this.props.isActive}
            />
        );
    }
}


export default VisualizerContainer;
