import React from 'react';

import VisualizerContainer from '../../containers/visualizer';


const VisualizeIDE = ({visualOperations, activeRow, displayedRowsCount, handleNextOperation, handleRestartOperations}) => {
    const actualVisualOperationIndexes = {};

    for (let index = 0; index < visualOperations.length; ++index) {
        const operation = visualOperations[index];
        actualVisualOperationIndexes[operation.row] = index;
        if (index > activeRow) {
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

    return (
        <>
            {visualizers}
            <div>
                <button onClick={() => handleNextOperation()}>Next</button>
                <button onClick={() => handleRestartOperations()}>Restart</button>
            </div>
        </>
    );
}


export default VisualizeIDE;
