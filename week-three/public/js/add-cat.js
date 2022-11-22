'use strict';

window.addEventListener('load', () => {
    const url = 'http://localhost:3000'; // change url when uploading to server
    const form = document.querySelector('#addCatForm');
    const userList = document.querySelector('.add-owner');
    const formFields = {
        name: form.querySelector(`input[name='name']`),
        birthdate: form.querySelector(`input[name='birthdate']`),
        weight: form.querySelector(`input[name='weight']`),
        owner: form.querySelector(`select[name='owner']`),
        cat: form.querySelector(`input[name='cat']`)
    };

    // create user options to <select>
    const createUserOptions = (users) => {
        // clear user list
        userList.innerHTML = '';
        console.log(users);
        users.forEach((user) => {
            // create options with DOM methods
            const option = document.createElement('option');
            option.value = user.user_id;
            option.innerText = user.name;
            option.classList.add('light-border');
            userList.appendChild(option);
        });
    };

    // get users to form options
    const getUsers = async () => {
        try {
            const response = await fetch(url + '/user');
            const users = await response.json();
            createUserOptions(users);
        } catch (e) {
            console.log(e.message);
        }
    };
    getUsers();

    // submit add cat form
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const fetchOptions = {
            method: 'POST',
            body: new FormData(form)
        };
        const response = await fetch(url + '/cat', fetchOptions);
        const json = await response.json();
        alert(json.message);
        location.href = 'front.html';
    });

    for (let input of Object.values(formFields)) {
        input.addEventListener('input', (event) => {
            console.log(formFields.name.validity);
            if (formFields.name.validity.typeMismatch) {
                formFields.name.reportValidity();
            } else {
                formFields.name.setCustomValidity('');
            }
        });
    }
});
