'use strict';
import { storage, endpoints, url } from './common.js';

window.addEventListener('load', async () => {
    // select existing html elements
    const ul = document.querySelector('#list');

    // create cat cards
    const createCatCards = (cats) => {
        // clear ul
        ul.innerHTML = '';
        cats.forEach((cat) => {
            // create li with DOM methods
            const img = document.createElement('img');
            img.src = url + '/images/' + cat.fileName;
            img.alt = cat.name;
            img.classList.add('resp');

            // open image in single.html
            img.addEventListener('click', () => {
                location.href = 'single.html?id=' + cat.cat_id;
            });

            const figure = document.createElement('figure').appendChild(img);

            const h2 = document.createElement('h2');
            h2.innerHTML = cat.name;

            const p1 = document.createElement('p');
            p1.innerHTML = `Birthdate: ${cat.birthdate}`;

            const p2 = document.createElement('p');
            p2.innerHTML = `Weight: ${cat.weight}kg`;

            const p3 = document.createElement('p');
            p3.innerHTML = `Owner: ${cat.ownerName}`;

            const li = document.createElement('li');
            li.classList.add('light-border');

            li.appendChild(h2);
            li.appendChild(figure);
            li.appendChild(p1);
            li.appendChild(p2);
            li.appendChild(p3);
            ul.appendChild(li);
            if (
                storage.getUser().role === 0 ||
                storage.getUser().user_id === cat.owner
            ) {
                // link to modify form
                const modButton = document.createElement('a');
                modButton.innerHTML = 'Modify';
                modButton.href = `modify-cat.html?id=${cat.cat_id}`;
                modButton.classList.add('button');

                // delete selected cat
                const delButton = document.createElement('button');
                delButton.innerHTML = 'Delete';
                delButton.classList.add('button');
                delButton.addEventListener('click', async () => {
                    {
                        const { error } = await endpoints.deleteCatById(
                            cat.id,
                            storage.getToken()
                        );
                        if (error) {
                            console.log(error.message);
                        }
                    }
                    {
                        const { error, items } = await endpoints.getCats(
                            storage.getToken()
                        );
                        if (error) {
                            console.log(error.message);
                        } else {
                            createCatCards(items);
                        }
                    }
                });

                li.appendChild(modButton);
                li.appendChild(delButton);
            }
        });
    };

    {
        const { error, items } = await endpoints.getCats(storage.getToken());
        if (error) {
            console.log(error.message);
        } else {
            createCatCards(items);
        }
    }
});
