'use strict';

import { endpoints } from './common.js';

window.addEventListener('load', () => {
    // select existing html elements
    const form = document.querySelector('#addCatForm');
    const formFields = {
        name: form.querySelector(`input[name='name']`),
        birthdate: form.querySelector(`input[name='birthdate']`),
        weight: form.querySelector(`input[name='weight']`),
        singleImage: form.querySelector(`input[name='singleImage']`)
    };

    form.onsubmit = (event) => {
        event.preventDefault();
    };

    // submit add cat form
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const { response, error, body } = await endpoints.createCat(
            new FormData(form)
        );
        console.log({ error, body });
        if (!error) {
            alert(body.message);
            location.href = 'front.html';
        } else {
            alert(error.message);
        }
    });
});
