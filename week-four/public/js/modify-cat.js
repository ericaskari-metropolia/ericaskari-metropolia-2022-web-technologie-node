'use strict';
import {
    createUserDropdownOptions,
    endpoints,
    getQueryParam
} from './common.js';

window.addEventListener('load', () => {
    // get id from address
    const catId = getQueryParam('id');

    // select existing html elements
    const form = document.querySelector('#modCatForm');
    const ownerIdSelectEl = document.querySelector('.add-owner');
    const formFields = {
        name: form.querySelector(`input[name='name']`),
        birthdate: form.querySelector(`input[name='birthdate']`),
        weight: form.querySelector(`input[name='weight']`),
        singleImage: form.querySelector(`input[name='singleImage']`)
    };

    // get user data for admin check
    const user = JSON.parse(sessionStorage.getItem('user'));

    // if user is not admin delete owner selection
    if (user.role > 0) ownerIdSelectEl.remove();

    // submit modify form
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(form);
        // remove empty properties
        for (const [prop, value] of Object.entries(data)) {
            if (value === '') {
                delete data[prop];
            }
        }
        const { response, body, error } = await endpoints.editCat(data);
        if (error) {
            alert(error.message);
        } else {
            alert(body.message);
        }
        location.href = 'front.html';
    });

    // start filling the form
    // if admin
    if (user.role === 0) {
        endpoints.getUsers().then(({ error, body, response }) => {
            if (!error) {
                createUserDropdownOptions(ownerIdSelectEl, body);
            }
        });
    } else {
        endpoints.getCatById(catId).then(({ response, body, error }) => {
            const inputs = form.querySelectorAll('input');
            inputs[0].value = body.name;
            inputs[1].value = body.birthdate;
            inputs[2].value = body.weight;
            if (user.role === 0) {
                form.querySelector('select').value = body.ownerId;
            }
        });
    }
});
