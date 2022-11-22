'use strict';

window.addEventListener('load', () => {
    const url = 'http://localhost:3000'; // change url when uploading to server
    const form = document.querySelector('#addUserForm');
    const formFields = {
        name: form.querySelector(`input[name='name']`),
        email: form.querySelector(`input[name='email']`),
        password: form.querySelector(`input[name='password']`)
    };

    // select existing html elements

    // submit add user form
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const data = serializeJson(addUserForm);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        };

        const response = await fetch(url + '/user', fetchOptions);
        if (response.status === 200) {
            const json = await response.json();
            alert(json.message);
            location.href = 'front.html';
        }
        if (response.status === 400) {
            const json = await response.json();
            const { errors = [] } = json ?? {};
            for (let { msg, param, location } of errors) {
                if (formFields[param]) {
                    formFields[param].nextElementSibling.textContent = msg;
                }
            }
            console.log(json);
        }
        alert(`Unknown Error happened: Code: ${response.status}`);
    });
});
