'use strict';
window.addEventListener('load', () => {
    const url = 'http://localhost:3000'; // change url when uploading to server
    // select existing html elements
    const ul = document.querySelector('#list');

    // create cat cards
    const createCatCards = (cats) => {
        // clear ul
        ul.innerHTML = '';
        cats.forEach(
            ({ id, name, weight, ownerId, ownerName, fileName, birthdate }) => {
                // create li with DOM methods
                const img = document.createElement('img');
                img.src = url + '/images/' + fileName;
                img.alt = name;
                img.classList.add('resp');

                const figure = document
                    .createElement('figure')
                    .appendChild(img);

                const h2 = document.createElement('h2');
                h2.innerHTML = name;

                const p1 = document.createElement('p');
                p1.innerHTML = `Birthdate: ${new Date(
                    birthdate
                ).toDateString()}`;

                const p2 = document.createElement('p');
                p2.innerHTML = `Weight: ${weight}kg`;

                const p3 = document.createElement('p');
                p3.innerHTML = `Owner: ${ownerName}`;

                // modify button
                const modButton = document.createElement('a');
                modButton.innerHTML = 'Modify';
                modButton.href = `modify-cat?id=${id}`;
                modButton.classList.add('button');

                // delete selected cat
                const delButton = document.createElement('button');
                delButton.innerHTML = 'Delete';
                delButton.classList.add('button');
                delButton.addEventListener('click', async () => {
                    const fetchOptions = {
                        method: 'DELETE'
                    };
                    try {
                        const response = await fetch(
                            url + '/cat/' + id,
                            fetchOptions
                        );
                        const json = await response.json();
                        console.log('delete response', json);
                        getCat();
                    } catch (e) {
                        console.log(e.message);
                    }
                });

                const li = document.createElement('li');
                li.classList.add(
                    ...'p-2 border border-2 border-black-400 rounded-md'.split(
                        ' '
                    )
                );

                li.appendChild(h2);
                li.appendChild(figure);
                li.appendChild(p1);
                li.appendChild(p2);
                li.appendChild(p3);
                li.appendChild(modButton);
                li.appendChild(delButton);
                ul.appendChild(li);
            }
        );
    };

    // AJAX call
    const getCat = async () => {
        try {
            const response = await fetch(url + '/cat');
            const cats = await response.json();
            createCatCards(cats);
        } catch (e) {
            console.log(e.message);
        }
    };
    getCat();
});
