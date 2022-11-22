'use strict';
const express = require('express');
const cors = require('cors');

const cats = require('./routes/cat.route');
const users = require('./routes/user.route');
const images = require('./routes/images.route');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library
app.use(express.urlencoded({ extended: true }));

app.use('/cat', cats);
app.use('/user', users);
app.use('/images', images);
app.use('/', (req, res, next) =>
    res.status(404).send({ message: 'Nothing here!' })
);

app.listen(port, () => {
    console.log(`Api Running on port ${port}!`);
    console.log(`Web Running on port 3001!`);
    console.log(`Open http://localhost:3001/`);
});
