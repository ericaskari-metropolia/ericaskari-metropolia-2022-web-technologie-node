'use strict';

const express = require('express');
const renderWelcomePage = require('./templates/welcome');
const { camelCase } = require('lodash');
const app = express();
const port = 3000;

console.log(`Foo Bar in camelCase is ${camelCase('Foo Bar')}`);

app.use(express.static('public'));

app.get('/pug', (req, res) => {
    const rendered = renderWelcomePage({
        name: 'Viewer'
    });
    res.send(rendered);
});

app.get('/catinfo', (req, res) => {
    const cat = {
        name: 'Frank',
        birthdate: '2010-12-25',
        weight: 5
    };
    res.json(cat);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
