export default class AlgoBridgeService {
    users = [
        {
            name: 'Tony',
            email: 'test1@gmail.com',
            password: '12345678',
            algos: [0, 1],
        }, {
            name: 'Bake',
            email: 'test2@gmail.com',
            password: '12345678',
            algos: [],
        }
    ];

    algoMaker = (id, title, complexity) => {
        return { id, title, complexity } 
    }

    algos = [
        this.algoMaker(0, 'Bubble sorting', 'O(n^2)'),
        this.algoMaker(1, 'QSort', 'O(n*log(n))'),
    ];

    loginUser = (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.users.forEach((user) => {
                    if (user.email === email && user.password === password) {
                        resolve({ok: true, activeUser: user});
                    }
                });

                resolve({ok: false});
            }, 1700);
        });
    };

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
    }
}
