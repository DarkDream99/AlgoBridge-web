import ACTION_TYPES from './action_types';


const loginDone = (activeUser) => {
    return {
        type: ACTION_TYPES.LOGIN_SUCCESS, 
        payload: activeUser,
    };
};

export default loginDone;

