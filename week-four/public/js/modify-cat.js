'use strict';
import {
    createUserDropdownOptions,
    endpoints,
    formRawValue,
    formValue,
    getQueryParam,
    handleErrorCode,
    setFormValue
} from './common.js';

window.addEventListener('load', () => {
    // get id from address
    const catId = getQueryParam('id');

    // select existing html elements
    const form = document.querySelector('#modCatForm');
    const formFields = {
        id: form.querySelector(`input[name='id']`),
        name: form.querySelector(`input[name='name']`),
        weight: form.querySelector(`input[name='weight']`),
        ownerId: form.querySelector(`select[name='ownerId']`),
        fileName: form.querySelector(`input[name='fileName']`),
        birthdate: form.querySelector(`input[name='birthdate']`)
    };

    // get user data for admin check
    const user = JSON.parse(sessionStorage.getItem('user'));

    // if user is not admin delete owner selection
    if (user.role > 0) formFields.ownerId.remove();

    // submit modify form
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const { response, body, error } = await endpoints.editCat(
            new FormData(form)
        );
        if (error) {
            handleErrorCode(error);
        } else {
            alert(body.message);
            location.href = 'front.html';
        }
    });

    // start filling the form
    // if admin
    if (user.role === 0) {
        formFields.ownerId.classList.remove('hidden');

        endpoints.getUsers().then(({ error, body, response }) => {
            console.log(body);
            if (!error) {
                createUserDropdownOptions(formFields.ownerId, body);
            }
        });
    } else {
        endpoints.getCatById(catId).then(({ response, body, error }) => {
            setFormValue(formFields, body);
        });
    }
});
