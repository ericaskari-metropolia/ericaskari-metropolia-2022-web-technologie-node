'use strict';
window.addEventListener('load', () => {
    const url = 'http://localhost:3000'; // change url when uploading to server

    // select existing html elements
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#add-user-form');

    // login
    loginForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(loginForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url + '/auth/login', fetchOptions);
        const json = await response.json();
        console.log('login response', json);
        if (!json.user) {
            alert(json.message);
        } else {
            // save token
            sessionStorage.setItem('token', json.token);
            sessionStorage.setItem('user', JSON.stringify(json.user));
            location.href = 'front.html';
        }
    });

    // submit register form
    registerForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(registerForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url + '/auth/register', fetchOptions);
        if (response.status === 200) {
            const { message, user, accessToken, expiresAt } =
                await response.json();
            sessionStorage.setItem('token', accessToken);
            sessionStorage.setItem('expiresAt', expiresAt);
            sessionStorage.setItem('user', JSON.stringify(user));
            alert(message);
            location.href = 'front.html';
        } else {
            alert('Something went wrong!');
        }
    });
});
