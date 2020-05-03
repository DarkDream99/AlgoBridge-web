const API_URL = process.env.REACT_APP_API_URL;
const LOGIN_URL = 'api-token-auth/';
const USER_INFO_URL = 'user-info/';
const RUN_IMPLEMENTATION_URL = 'interpreter/run_implementation/';
const ALGOS_URL = 'algos/';


export default class AlgoBridgeService {

    loginUser = (username, password) => {
        return fetch(
            API_URL + LOGIN_URL,
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        username: username,
                        password: password
                    }
                )
            }
        ).then((response) => {
            return response.json();
        });
    };

    userInfo = (authToken) => {
        return fetch(
            API_URL + USER_INFO_URL,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                }
            }
        ).then((response) => {
            return response.json();
        });
    }

    runImplementation = (operations) => {
        let authToken = window.localStorage.getItem('authToken');
        return fetch(
            API_URL + RUN_IMPLEMENTATION_URL + `?operations=${operations}`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                }
            }
        ).then((response) => {
            return response.json();
        });
    }

    createAlgo = (title, description, operations) => {
        let authToken = window.localStorage.getItem('authToken');
        let statusCode = 200;
        return fetch(
            API_URL + ALGOS_URL,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    implementation: operations
                })
            }
        ).then((responseBase) => {
            statusCode = responseBase.status;
            return responseBase.json();
        }).then((responseData) => {
            responseData['status'] = statusCode;
            return new Promise((resove) => {
                resove(responseData);
            })
        });
    }

    userAlgos = () => {
        let authToken = window.localStorage.getItem('authToken');
        let statusCode = 200;

        return fetch(
            API_URL + ALGOS_URL,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                },
            }
        ).then((responseBase) => {
            statusCode = responseBase.status;
            return responseBase.json();
        }).then((responseData) => {
            responseData['statusCode'] = statusCode;
            return new Promise((resove) => {
                resove(responseData);
            })
        });
    }

    userAlgo = (id) => {
        let authToken = window.localStorage.getItem('authToken');
        let statusCode = 200;

        return fetch(
            API_URL + ALGOS_URL + `${id}/`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                }
            }
        ).then((responseBase) => {
            statusCode = responseBase.status;
            return responseBase.json();
        }).then((responseData) => {
            responseData['statusCode'] = statusCode;
            return new Promise((resove) => {
                resove(responseData);
            });
        });
    }

    updateAlgo = (id, title, description, implementation) => {
        let authToken = window.localStorage.getItem('authToken');
        let statusCode = 200;

        return fetch(
            API_URL + ALGOS_URL + `${id}/`,
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    implementation: implementation
                })
            }
        ).then((responseBase) => {
            statusCode = responseBase.status;
            return responseBase.json();
        }).then((responseData) => {
            responseData['statusCode'] = statusCode;
            return new Promise((resove) => {
                resove(responseData);
            });
        });
    }

    deleteAlgo = (id) => {
        let authToken = window.localStorage.getItem('authToken');

        return fetch(
            API_URL + ALGOS_URL + `${id}/`,
            {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + authToken
                },
            }
        ).then((responseBase) => {
            return responseBase;
        });
    }

    signupUser = (email, password) => {
        return new Promise((resove) => {
            setTimeout(() => {
                this.users.forEach((user) => {
                    if (user.email === email && user.password === password) {
                        resove({ok: false});
                    }
                });

                this.users.push({email, password});
                resove({ok: true});
            }, 1700);
        });
    };
}
