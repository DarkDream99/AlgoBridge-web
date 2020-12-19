import axios from 'axios';
import * as types from './actionTypes';
import { urls } from './config';

const getHeader = () => {
    const token = window.localStorage.getItem('authToken');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    }
}

export const createAlgo = (algoObj) => (dispatch) => {
    dispatch({ type: types.CREATE_ALGORITHM_REQUEST });
    axios.post(urls.ALGORITHMS, algoObj, getHeader())
        .then((res) => {
            dispatch({
                type: types.CREATE_ALGORITHM_SUCCESS,
                payload: res.data,
            });
        }).catch((error) => {
            dispatch({
                type: types.CREATE_ALGORITHM_FAIL,
                payload: error
            });
        });
}

export const fetchAlgo = (algoId) => (dispatch) => {
    dispatch({ type: types.GET_ALGORITHM_REQUEST });
    axios.get(urls.ALGORITHMS + `${algoId}/`, getHeader())
        .then((res) => {
            dispatch({
                type: types.GET_ALGORITHM_SUCCESS,
                payload: res.data,
            });
        }).catch((error) => {
            dispatch({
                type: types.GET_ALGORITHM_FAIL,
                payload: error
            });
        });
}

export const updateAlgo = (id, algoObj) => (dispatch) => {
    dispatch({ type: types.EDIT_ALGORITHM_REQUEST });
    axios.put(urls.ALGORITHMS + id, algoObj, getHeader())
        .then((res) => {
            dispatch({
                type: types.EDIT_ALGORITHM_SUCCESS,
                payload: res.data,
            });
        }).catch((error) => {
            dispatch({
                type: types.EDIT_ALGORITHM_FAIL,
                payload: error
            });
        });
}

export const deleteAlgo = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_ALGORITM_REQUEST });
    axios.delete(urls.ALGORITHMS + id, getHeader())
        .then((res) => {
            dispatch({
                type: types.DELETE_ALGORITM_SUCCESS,
                payload: { ...res.data, id},
            });
        }).catch((error) => {
            dispatch({
                type: types.DELETE_ALGORITM_FAIL,
                payload: error
            });
        });
}

export const selectAlgoInList = (algoId) => (dispatch) => {
    dispatch({ type: types.SELECT_ALGORITHM_IN_LIST, payload: algoId });
}

export const fetchAlgos = () => (dispatch) => {
    dispatch({ type: types.GET_ALGORITHMS_REQUEST });
    axios.get(urls.ALGORITHMS, getHeader())
        .then((res) => {
            dispatch({
                type: types.GET_ALGORITHMS_SUCCESS,
                payload: res.data,
            });
        }).catch((error) => {
            dispatch({
                type: types.GET_ALGORITHMS_FAIL,
                payload: error
            });
        });
}