import { createSelector } from "reselect";

const getUserAlgo = (state) => state.getIn(["algo"]);
const isLoadingAlgo = (state) => state.getIn(["isLoading", "algo"]);

// reselect
export const getUserAlgoState = createSelector([getUserAlgo], (data) => data);
export const isLoadingAlgoState = createSelector([isLoadingAlgo], (data) => data);
