class Api {
    constructor(accessToServer) {
        this.token = accessToServer.token;
        this.groupID = accessToServer.groupID;
        this.serverAddress = accessToServer.serverAddress
    }

    infoAboutMe() {
        return fetch(`${this.serverAddress}/${this.groupID}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
        /*
            Можно лучше: проверка ответа сервера и преобразование из json
            дублируется во всех методах класса Api, лучше вынести в отдельный метод:
                _getResponseData(res) {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка: ${res.status}`); 
                    }
                    return res.json();
                }
            Подчеркивание в начале имени метода говорит о том, что метод является приватным, т.е.
            не используется вне класса Api   
        */
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            })
    }

    userCards() {
        return fetch(`${this.serverAddress}/${this.groupID}/cards`, {
            headers: {
                authorization: this.token
            }
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            })
    }

    newInfoAboutMe(name, job) {
        return fetch(`${this.serverAddress}/${this.groupID}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
                return res.json();
            })
    }
}