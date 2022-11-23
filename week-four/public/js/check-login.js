'use strict';
window.addEventListener('load', async () => {
    const url = 'http://localhost:3000'; // change url when uploading to server

    // check sessionStorage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
        location.href = 'login.html';
        return;
    }
    // check if token valid
    try {
        const fetchOptions = {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const response = await fetch(url + '/user/token', fetchOptions);
        console.log({ response });
        if (!response.ok) {
            location.href = 'logout.html';
        } else {
            const { user } = await response.json();
            console.log({ user });
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    } catch (e) {
        console.log(e.message);
    }
});
