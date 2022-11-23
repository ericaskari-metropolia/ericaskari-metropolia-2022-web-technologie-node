'use strict';
import { storage, endpoints } from './common.js';

window.addEventListener('load', async () => {
    if (!storage.getToken() || !storage.getUser()) {
        location.href = 'login.html';
        return;
    }

    // check if token valid
    const { error, item } = await endpoints.getTokenUser();

    if (error) {
        // location.href = 'logout.html';
    } else {
        storage.setUser(item);
    }
});
