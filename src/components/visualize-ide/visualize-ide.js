import React from 'react';

import VisualizerContainer from '../../containers/visualizer';
import Button from '../gui/button';
import ButtonGroup from '../gui/button-group';


const VisualizeIDE = (props) => {
    const {
        visualOperations, operations, visualOperationIndex, activeRow, displayedRowsCount, isShow,
        handleNextOperation, handleRestartOperations
    } = props;
    const actualVisualOperationIndexes = {};

    for (let index = 0; index < visualOperations.length; ++index) {
        const visualOperation = visualOperations[index];
        actualVisualOperationIndexes[visualOperation.row] = index;
        if (index > visualOperationIndex) {
            break;
        }
    }

    let visualizers = [];
    const sourceOperation = (operations && operations.length) ? JSON.parse(operations) : [];
    for (let index = 0; index < displayedRowsCount; ++index) {
        let targetOperation = {type: 'empty', parameter: {}}
        if (actualVisualOperationIndexes.hasOwnProperty(index)) {
            const targetVisualOperation = visualOperations[actualVisualOperationIndexes[index]];
            targetOperation = sourceOperation[targetVisualOperation.row] || targetOperation;
            visualizers.push(
                <VisualizerContainer
                    key={targetVisualOperation.row}
                    rowNumber={targetVisualOperation.row}
                    visualOperation={targetVisualOperation}
                    targetOperation={targetOperation}
                    isActive={activeRow === targetVisualOperation.row}
                    isClear={activeRow === -1}
                />
            );
        } else {
            visualizers.push(
                <VisualizerContainer
                    key={index}
                    rowNumber={index}
                    visualOperation={{type: 'empty'}}
                    targetOperation={targetOperation}
                    isActive={false}
                    isClear={activeRow === -1}
                />
            );
        }
    }

    const manageVisualButtonsGroup = (
        <ButtonGroup buttons={[
            <Button key='next' action={() => handleNextOperation()}>Next</Button>,
            <Button key='restart' action={() => handleRestartOperations()}>Restart</Button>
        ]}/>
    );


    if (isShow) {
        return (
            <>
                {visualizers}
                <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
                    {manageVisualButtonsGroup}
                </div>
            </>
        );
    }
    return <div></div>
}


export default VisualizeIDE;
