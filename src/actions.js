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
    axios.post(urls.CREATE_ALGORITHM, algoObj, getHeader())
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

export const getAlgo = (algoId) => (dispatch) => {
    dispatch({ type: types.GET_ALGORITHM_REQUEST });
    axios.get(urls.GET_ALGORITHM + `${algoId}/`, getHeader())
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