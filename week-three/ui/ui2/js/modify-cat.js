'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// get query parameter
const getQParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

// select existing html elements
const modForm = document.querySelector('#modCatForm');
const userList = document.querySelector('.add-owner');

// add existing cat data to form
const getCat = async (id, users) => {
    const response = await fetch(url + '/cat/' + id);
    const cat = await response.json();

    let d = new Date(cat.birthdate);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const birthdate = [ye, mo, da].join('-');

    modForm.querySelector(`input[name='name']`).value = cat.name;
    modForm.querySelector(`input[name='birthdate']`).value = birthdate;
    modForm.querySelector(`input[name='weight']`).value = cat.weight;
    modForm.querySelector(`input[name='cat_id']`).value = cat.cat_id;
    modForm.querySelector(`input[name='filename']`).value = cat.filename;
    modForm.querySelector(`select[name='owner']`).value = cat.owner;
    users.forEach((user) => {
        const option = document.createElement('option');
        option.value = user.id;
        option.innerHTML = user.name;
        option.classList.add('light-border');
        modForm.querySelector(`select[name='owner']`).appendChild(option);
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
modForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const data = serializeJson(modForm);
    const fetchOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    console.log(fetchOptions);
    await fetch(url + '/cat', fetchOptions);
    alert('Updated successfully!');
    location.href = 'front.html';
});
