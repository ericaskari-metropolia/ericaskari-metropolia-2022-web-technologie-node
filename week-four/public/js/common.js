export const url = 'http://localhost:3000'; // change url when uploading to server

export const ERROR_CODES = {
    EXPIRED_TOKEN: 0,
    BAD_TOKEN: 1,
    EMAIL_TAKEN: 2,
    VALIDATION_ERR: 3
};

export const handleKnownClientErrors = ({ code }) => {
    if (Number.isNaN(code)) {
        return;
    }

    switch (code) {
        case ERROR_CODES.EXPIRED_TOKEN:
            location.href = `login.html?redirect-reason=${code}`;
            break;
    }
};

// get query parameter
export const getQueryParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

// get query parameter
export const handleErrorCode = (
    el = document.getElementById('page-error'),
    errorCode = null
) => {
    const paramErrorCode = parseInt(getQueryParam('redirect-reason') ?? '-');
    const parsedParamErrorCode = Number.isNaN(paramErrorCode)
        ? null
        : paramErrorCode;
    const code = errorCode ? errorCode : parsedParamErrorCode;

    switch (code) {
        case ERROR_CODES.EXPIRED_TOKEN:
            el.style.display = 'block';
            el.innerText = 'Your session was expired. Please log in again';
            break;
    }
};

export const createUserDropdownOptions = (selectEl, users) => {
    selectEl.innerHTML = '';
    users.forEach((user) => {
        const option = document.createElement('option');
        option.value = user.id;
        option.innerHTML = user.name;
        selectEl.appendChild(option);
    });
};

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
            const error = await response.json();
            handleKnownClientErrors(error);
            return { error, item: null, response };
        }
    },
    getUsers: async (token = storage.getToken()) => {
        const response = await fetch(`${url}/user`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            const error = await response.json();
            handleKnownClientErrors(error);
            return { error, body: null, response };
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
    getCatById: async (id, token = storage.getToken()) => {
        const response = await fetch(`${url}/cat/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), body: null, response };
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
    },
    createCat: async (body, token = storage.getToken()) => {
        const response = await fetch(`${url}/cat`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            body
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), body: null, response };
        }
    },
    editCat: async (body, token = storage.getToken()) => {
        const response = await fetch(`${url}/cat/${body.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify(body)
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), body: null, response };
        }
    },
    login: async (body, token = storage.getToken()) => {
        const response = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), body: null, response };
        }
    },
    register: async (body, token = storage.getToken()) => {
        const response = await fetch(`${url}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            return { error: await response.json(), body: null, response };
        }
    }
};
