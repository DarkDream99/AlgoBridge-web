const API_URL = 'https://algobridge-api.herokuapp.com/';
// const API_URL = ' http://127.0.0.1:8000/';
const LOGIN_URL = 'api-token-auth/';
const USER_INFO_URL = 'user-info/';


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
        debugger;
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

    userAlgos = (activeUser) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let userAlgos = [];
                activeUser.algos.forEach((algoId) => {
                    const foundAlgo = this.algos.find((algo) => algo.id === algoId);
                    if (foundAlgo)
                        userAlgos.push(foundAlgo);
                });

                resolve({userAlgos});
            }, 600);
        });
    }

    runAlgo = (operations, inputs="") => {
        return null;
    }
}
