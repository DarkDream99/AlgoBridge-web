import React from 'react';
import {
    AlgoBridgeConstantsServiceConsumer
} from '../../../components/service-context/algobridge-constants-service-context';


const withAlgoBridgeConstantsService = () => (Wrapper) => {
    const constantsService = (props) => {
        return (
            <AlgoBridgeConstantsServiceConsumer>
                {
                    (algoBridgeConstantsService) => {
                        return (
                            <Wrapper {...props} algoBridgeConstantsService={algoBridgeConstantsService} />
                        );
                    }
                }
            </AlgoBridgeConstantsServiceConsumer>
        );
    }
    constantsService.displayName = 'AlgoBridgeConstantsService';
    return constantsService;
}


export default withAlgoBridgeConstantsService;