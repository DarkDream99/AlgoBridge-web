import ACTION_TYPES from '../actions/action_types';

const defaultUser = {
    name: 'anonymous',
    email: 'empty email',
};

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
        },
        userHome: {
            label: 'Home',
            href: '/user-home',
        },
        userAlgos: {
            label: 'My algos',
            href: '/user-algos',
        },
        createNewAlgo: {
            label: 'Create new algorithm',
            href: '/algo/new',
        },
    },
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
            window.localStorage.setItem('authToken', action.authToken);
            return {
                ...state,
                isLogin: true,
                activeUser: defaultUser,
            };

        case ACTION_TYPES.LOGOUT_SUCCESS:
            return {
                ...state,
                isLogin: false,
                activeUser: defaultUser,
            };

        default:
            return state;
    }
};

export default reducer;

