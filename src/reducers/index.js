import ACTION_TYPES from '../actions/action_types';

const initialState = {
    links: {
        home: {
            label: 'Home',
            href: '/',
        },
        login: {
            label: 'Login',
            href: '/login',
        },
        signup: {
            label: 'Signup',
            href: '/signup',
        }
    },
    isLogin: false,
    activeUser: null,
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                activeUser: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;

