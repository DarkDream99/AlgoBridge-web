import React from 'react';

import Operation from '../code-ide/operation';


const Visualizer = (props) => {

    const {targetOperation, rowNumber, borderRef, isActive} = props;
    const svgId = `board-${rowNumber}`;

    let activeStyle = {
        height: '100%',
        width: '100%',
        backgroundColor: '#e1d1d1',
        border: '3px solid black'
    };
    if (isActive) {
        activeStyle['border'] = '3px solid orange'
    }

    return (
        <>
            <div style={{ height: '120px', width: '100%' }}>
                <span style={{ display: 'flex', alignContent: 'center' }}>
                    {rowNumber}: &nbsp;
                    <Operation
                        {...targetOperation}
                        isDraggable={false}
                    />
                </span>
                <svg id={svgId} viewBox="0 0 200 100" style={ activeStyle } ref={borderRef}></svg>
            </div>

            <br/>
        </>
    );
};


export default Visualizer;
