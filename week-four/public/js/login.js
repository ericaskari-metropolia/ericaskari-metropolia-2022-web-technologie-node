'use strict';
import { storage, endpoints, handleErrorCode } from './common.js';

window.addEventListener('load', () => {
    console.log({ storage, endpoints });
    const url = 'http://localhost:3000'; // change url when uploading to server

    // select existing html elements
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#add-user-form');

    handleErrorCode();

    // login
    loginForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const { body, error, response } = await endpoints.login(
            JSON.stringify(serializeJson(loginForm))
        );
        console.log('login response', body);

        if (error) {
            console.log(error);
        } else {
            const { user, accessToken, expiresAt } = body;
            storage.setUser(user);
            storage.setToken(accessToken);
            storage.setExpiresAt(expiresAt);
            location.href = 'front.html';
        }
    });

    // submit register form
    registerForm.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const { body, error } = await endpoints.register(
            JSON.stringify(serializeJson(registerForm))
        );
        if (error) {
            console.log(error);
        } else {
            const { user, accessToken, expiresAt } = body;
            storage.setUser(user);
            storage.setToken(accessToken);
            storage.setExpiresAt(expiresAt);
            location.href = 'front.html';
        }
    });
});
