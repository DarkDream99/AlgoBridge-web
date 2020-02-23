import ACTION_TYPES from './action_types';


const logoutDone = (activeUser) => {
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('activeUser');
    return {
        type: ACTION_TYPES.LOGOUT_SUCCESS,
    };
};

export default logoutDone;
