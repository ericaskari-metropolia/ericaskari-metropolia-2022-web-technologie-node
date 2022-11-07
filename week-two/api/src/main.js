'use strict';
const express = require('express');
const cats = require('./routes/catRoute');
const users = require('./routes/userRoute');
const app = express();
const port = 3000;

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library

app.use('/cat', cats);
app.use('/user', users);

app.listen(port, () => console.log(`Week two app listening on port ${port}!`));
