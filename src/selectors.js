import { createSelector } from "reselect";

const getUserAlgo = (state) => state.getIn(["algo"]);
const getUserAlgos = (state) => state.getIn(["algos"]);
const isLoadingAlgo = (state) => state.getIn(["isLoading", "algo"]);
const isLoadingAlgos = (state) => state.getIn(["isLoading", "algos"]);
const getSelectedAlgo = (state) => state.getIn(["selectedAlgo"]);

// reselect
export const getUserAlgoState = createSelector([getUserAlgo], (data) => data);
export const getUserAlgosState = createSelector([getUserAlgos], (data) => data);
export const isLoadingAlgoState = createSelector([isLoadingAlgo], (data) => data);
export const isLoadingAlgosState = createSelector([isLoadingAlgos], (data) => data);
export const getSelectedAlgoState = createSelector([getSelectedAlgo], (data) => data);