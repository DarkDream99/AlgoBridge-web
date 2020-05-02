export default class AlgoBridgeServiceDummy {
    users = [
        {
            name: 'Tony',
            email: 'test1@gmail.com',
            password: '12345678',
            algos: [0, 1, 3],
        }, {
            name: 'Bake',
            email: 'test2@gmail.com',
            password: '12345678',
            algos: [],
        }
    ];

    algoMaker = (id, title, memoryUp, speedUp, speedMiddle) => {
        return { id, title, memoryUp, speedUp, speedMiddle }
    };

    algos = [
        this.algoMaker(0, 'Bubble sorting', 'n','n^2', 'n^2'),
        this.algoMaker(1, 'QSort', 'n^2','n^2', 'n*log(n)'),
        this.algoMaker(2, 'Heap sort', 'n', 'n*log(n)', 'n*log(n)'),
        this.algoMaker(3, 'Radix sort', 'n', 'n*m', 'n*m'),
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
}
