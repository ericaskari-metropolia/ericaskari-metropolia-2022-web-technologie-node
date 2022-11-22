'use strict';
window.addEventListener('load', () => {
    const url = 'http://localhost:3000'; // change url when uploading to server
    const form = document.querySelector('#modCatForm');
    const userList = document.querySelector('.add-owner');

    const formFields = {
        name: form.querySelector(`input[name='name']`),
        birthdate: form.querySelector(`input[name='birthdate']`),
        weight: form.querySelector(`input[name='weight']`),
        ownerId: form.querySelector(`select[name='ownerId']`),
        id: form.querySelector(`input[name='id']`),
        fileName: form.querySelector(`input[name='fileName']`)
    };
    console.log(formFields);
    const endpoints = {
        getUsers: () => fetch(url + '/user'),
        getUserById: (id) => fetch(url + '/cat/' + id)
    };

    // get query parameter
    const getQParam = (param) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(param);
    };

    // add existing cat data to form
    const getCat = async (id, users) => {
        const response = await endpoints.getUserById(id);
        const cat = await response.json();

        let d = new Date(cat.birthdate);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        const birthdate = [ye, mo, da].join('-');

        formFields.name.value = cat.name;
        formFields.birthdate.value = birthdate;
        formFields.weight.value = cat.weight;
        formFields.id.value = cat.id;
        formFields.fileName.value = cat.fileName;
        formFields.ownerId.value = cat.ownerId;

        users.forEach((user) => {
            const option = document.createElement('option');
            option.value = user.id;
            option.innerHTML = user.name;
            option.classList.add('light-border');
            formFields.ownerId.appendChild(option);
        });
    };

    // create user options to <select>
    const createUserOptions = async (users) => {
        userList.innerHTML = '';
        await getCat(getQParam('id'), users);
    };

    // get users to form options
    const getUsers = async () => {
        try {
            const response = await endpoints.getUsers();
            const users = await response.json();
            await createUserOptions(users);
        } catch (e) {
            console.log(e.message);
        }
    };
    getUsers().then();

    // submit modify form
    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const data = serializeJson(form);
        const fetchOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url + '/cat', fetchOptions);

        if (response.status === 200) {
            alert('Updated successfully!');
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
