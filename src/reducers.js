import { Map, List } from "immutable";
import * as types from "./actionTypes";

export const initialState = Map({
    algos: List([]),
    isLoading: {
        algo: false,
        algos: false,
        algoCreation: false,
    },
    algo: null,
    selectedAlgo: null,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ALGORITHM_REQUEST: {
            return state.setIn(["isLoading", "algoCreation"], true);
        }
        case types.GET_ALGORITHM_REQUEST: {
            return state.setIn(["isLoading", "algo"], true);
        }
        case types.GET_ALGORITHM_SUCCESS: {
            return state.setIn(["isLoading", "algo"], false)
                .setIn(["algo"], action.payload);
        }
        case types.SELECT_ALGORITHM_IN_LIST: {
            const selected = state.getIn(["algos"]).find((a) => a.id === action.payload);
            const mapped = selected ? { ...selected, implementation: selected.code } : null;
            return state.setIn(["selectedAlgo"], mapped);
        }
        case types.GET_ALGORITHMS_REQUEST: {
            return state.setIn(["isLoading", "algos"], true);
        }
        case types.GET_ALGORITHMS_SUCCESS: {
            const data = action.payload;
            return state.setIn(["isLoading", "algos"], false)
                .setIn(["algos"], data);
        }
        case types.EDIT_ALGORITHM_REQUEST: {
            return state.setIn(["isLoading", "algo"], true);
        }
        case types.EDIT_ALGORITHM_SUCCESS: {
            const data = action.payload;
            return state.setIn(["isLoading", "algo"], false)
                .setIn(["selectedAlgo"], data);
        }
        case types.DELETE_ALGORITM_REQUEST: {
            return state.setIn(["isLoading", "algo"], true);
        }
        case types.DELETE_ALGORITM_SUCCESS: {
            return state.setIn(["selectedAlgo"], null);
        }

        default: {
            return state;
        }
    }
};

export default reducer;
