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
        formFields.email.className = [
            formFields.email.className,
            'invalid'
        ].join(' ');
        formFields.email.nextElementSibling.textContent =
            'I expect an e-mail, darling!';
        formFields.email.nextElementSibling.className = 'error active';

        // const data = serializeJson(addUserForm);
        // const fetchOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data) // body data type must match "Content-Type" header
        // };
        //
        // const response = await fetch(url + '/user', fetchOptions);
        // const json = await response.json();
        // alert(json.message);
        // location.href = 'front.html';
    });
});
