export default class AlgoBridgeService {
    users = [
        {
            name: 'Tony',
            email: 'test1@gmail.com',
            password: '12345678',
        }, {
            name: 'Bake',
            email: 'test2@gmail.com',
            password: '12345678',
        }
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
