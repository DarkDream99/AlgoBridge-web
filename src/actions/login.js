import ACTION_TYPES from './action_types';


const loginDone = (authToken) => {
    return {
        type: ACTION_TYPES.LOGIN_SUCCESS, 
        authToken: authToken,
    };
};

export default loginDone;

