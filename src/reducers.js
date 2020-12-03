import { Map, List } from 'immutable';
import * as types from './actionTypes';

export const initialState = Map({
    algos: List([]),
    isLoading: {
        algo: false,
        algos: false,
        algoCreation: false,
    },
    algo: null,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ALGORITHM_REQUEST: {
            return state.setIn(['isLoading', 'algoCreation'], true);
        }
        case types.GET_ALGORITHM_REQUEST: {
            return state.setIn(['isLoading', 'algo'], true);
        }
        case types.GET_ALGORITHM_SUCCESS: {
            return state.setIn(['isLoading', 'algo'], false)
                .setIn(['algo'], action.payload);
        }

        default: {
            return state;
        }
    }
};

export default reducer;

