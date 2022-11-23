export const url = 'http://localhost:3000'; // change url when uploading to server

export const storage = {
    setUser: (user) => sessionStorage.setItem('user', JSON.stringify(user)),
    setToken: (token) => sessionStorage.setItem('token', token),
    setExpiresAt: (expiresAt = Date.now()) =>
        sessionStorage.setItem('expiresAt', String(expiresAt)),
    getUser: () => JSON.parse(sessionStorage.getItem('user')),
    getToken: () => sessionStorage.getItem('token'),
    getExpiresAt: () => {
        const parsed = Number.parseInt(sessionStorage.getItem('expiresAt'));
        return Number.isNaN(parsed) ? Date.now() : parsed;
    }
};
export const endpoints = {
    getTokenUser: async (token = storage.getToken()) => {
        const response = await fetch(`${url}/auth/token`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            return {
                item: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), item: null, response };
        }
    },
    getCats: async (token = storage.getToken()) => {
        const response = await fetch(url + '/cat', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            return {
                items: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), items: [], response };
        }
    },
    deleteCatById: async (id, token = storage.getToken()) => {
        const response = await fetch(`${url}/cat/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            return {
                item: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), item: null, response };
        }
    }
};
