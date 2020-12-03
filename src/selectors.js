import { createSelector } from 'reselect';

const getUserAlgo = (state) => {
    return state.getIn(['algo'])
};

// reselect
export const getUserAlgoState = createSelector([getUserAlgo], (data) => data);