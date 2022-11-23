'use strict';
import { storage, endpoints, handleKnownClientErrors } from './common.js';

window.addEventListener('load', async () => {
    if (!storage.getToken() || !storage.getUser()) {
        location.href = 'login.html';
        return;
    }

    // check if token valid
    const { error, item, response } = await endpoints.getTokenUser();
    if (error) {
        handleKnownClientErrors(error);
    } else {
        storage.setUser(item);
    }
});
