import React from 'react';
import {AlgoBridgeServiceConsumer} from '../../../components/service-context/algobridge-service-constext';


const withAlgoBridgeService = () => (Wrapper) => {
    const algoBridgeService = (props) => {
        return (
            <AlgoBridgeServiceConsumer>
                {
                    (algoBrigdeService) => {
                        return (
                            <Wrapper {...props} 
                                algoBridgeService={algoBrigdeService} />
                        );
                    }
                }
            </AlgoBridgeServiceConsumer> 
        );
    };
    algoBridgeService.displayName = 'AlgoBridgeService';
    return algoBridgeService;
};


export default withAlgoBridgeService;

