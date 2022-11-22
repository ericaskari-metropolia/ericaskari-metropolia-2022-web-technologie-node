'use strict';
window.addEventListener('load', () => {
    const url = 'http://localhost:3000'; // change url when uploading to server
    const form = document.querySelector('#modCatForm');
    const userList = document.querySelector('.add-owner');

    const formFields = {
        name: form.querySelector(`input[name='name']`),
        birthdate: form.querySelector(`input[name='birthdate']`),
        weight: form.querySelector(`input[name='weight']`),
        owner: form.querySelector(`select[name='owner']`),
        cat_id: form.querySelector(`input[name='cat_id']`),
        filename: form.querySelector(`input[name='filename']`)
    };

    // get query parameter
    const getQParam = (param) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get(param);
    };

    // add existing cat data to form
    const getCat = async (id, users) => {
        const response = await fetch(url + '/cat/' + id);
        const cat = await response.json();

        let d = new Date(cat.birthdate);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        const birthdate = [ye, mo, da].join('-');

        formFields.name.value = cat.name;
        formFields.birthdate.value = birthdate;
        formFields.weight.value = cat.weight;
        formFields.cat_id.value = cat.cat_id;
        formFields.filename.value = cat.filename;
        formFields.owner.value = cat.owner;

        console.log({ users });
        users.forEach((user) => {
            const option = document.createElement('option');
            option.value = user.user_id;
            option.innerHTML = user.name;
            option.classList.add('light-border');
            form.querySelector(`select[name='owner']`).appendChild(option);
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
            const response = await fetch(url + '/user');
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

        await fetch(url + '/cat', fetchOptions);
        alert('Updated successfully!');
        location.href = 'front.html';
    });
});
