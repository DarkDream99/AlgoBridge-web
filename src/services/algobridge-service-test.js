export default class AlgoBridgeService {
    users = [
        {
            email: 'test1@gmail.com',
            password: 'test1',
        }, {
            email: 'test2@gmail.com',
            password: 'test2',
        }
    ];

    loginUser = (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.users.forEach((user) => {
                    if (user.email === email && user.password === password) {
                        resolve(true);
                    } 
                });

                resolve(false);
            }, 700);
        });
    }

    signupUser = (email, password) => {
        return new Promise((resove) => {
            this.users.forEach((user) => {
                if (user.email === email && user.password === password) {
                    resove(false);
                }
            });

            this.users.push({email, password})
            resove(true); 
        });
    }
}
