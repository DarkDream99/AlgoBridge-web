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
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;

