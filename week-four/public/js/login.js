'use strict';
import { storage, endpoints } from './common.js';

window.addEventListener('load', () => {
    console.log({ storage, endpoints });
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
            storage.setUser(json.user);
            storage.setToken(json.accessToken);
            storage.setExpiresAt(json.expiresAt);
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
            const json = await response.json();
            storage.setUser(json.user);
            storage.setToken(json.accessToken);
            storage.setExpiresAt(json.expiresAt);
            alert(message);
            location.href = 'front.html';
        } else {
            alert('Something went wrong!');
        }
    });
});
