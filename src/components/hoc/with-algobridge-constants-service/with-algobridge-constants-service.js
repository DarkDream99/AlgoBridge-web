import React from 'react';
import {
    AlgoBridgeConstantsServiceConsumer
} from '../../../components/service-context/algobridge-constants-service-context';


const withAlgoBridgeConstantsService = () => (Wrapper) => {
    return (props) => {
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
}

export default withAlgoBridgeConstantsService;
