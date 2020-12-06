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
            const data = action.payload;
            const result = {
                ...data,
                implementation: JSON.parse(data.implementation),
            };
            return state.setIn(["isLoading", "algo"], false)
                .setIn(["algo"], result);
        }
        case types.SELECT_ALGORITHM_IN_LIST: {
            const selected = state.getIn(["algos"]).find((a) => a.id === action.payload);
            const mapped = selected ? { ...selected, implementation: JSON.parse(selected.implementation), } : null;
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

        default: {
            return state;
        }
    }
};

export default reducer;
