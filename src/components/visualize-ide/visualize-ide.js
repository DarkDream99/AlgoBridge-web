import React from 'react';

import VisualizerContainer from '../../containers/visualizer';
import Button from '../gui/button';
import ButtonGroup from '../gui/button-group';


const VisualizeIDE = ({visualOperations, visualOperationIndex, activeRow, displayedRowsCount, handleNextOperation, handleRestartOperations}) => {
    const actualVisualOperationIndexes = {};

    for (let index = 0; index < visualOperations.length; ++index) {
        const operation = visualOperations[index];
        actualVisualOperationIndexes[operation.row] = index;
        if (index > visualOperationIndex) {
            break;
        }
    }

    let visualizers = [];
    for (let index = 0; index < displayedRowsCount; ++index) {
        if (actualVisualOperationIndexes.hasOwnProperty(index)) {
            const targetOperation = visualOperations[actualVisualOperationIndexes[index]];
            visualizers.push(
                <VisualizerContainer 
                    key={targetOperation.row}
                    rowNumber={targetOperation.row}
                    visualOperation={targetOperation}
                    isActive={activeRow === targetOperation.row} 
                    isClear={activeRow === -1}
                />
            );
        } else {
            visualizers.push(
                <VisualizerContainer 
                    key={index}
                    rowNumber={index}
                    visualOperation={{type: 'empty'}}
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

    return (
        <>
            {visualizers}
            <div style={{ position: 'fixed', right: 0, bottom: 0 }}>
                {manageVisualButtonsGroup}
            </div>
        </>
    );
}


export default VisualizeIDE;
