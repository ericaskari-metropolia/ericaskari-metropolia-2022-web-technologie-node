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

app.listen(port, () => console.log(`Week two app listening on port ${port}!`));
