'use strict';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const cats = require('./routes/cat.route');
const users = require('./routes/user.route');
const images = require('./routes/images.route');
const { db, runMigrations } = require('./database');

async function start() {
    const app = express();
    const port = 3000;

    await runMigrations(db);

    app.use(cors());
    app.use(morgan('tiny'));

    app.use(express.json()); // Used to parse JSON bodies

    app.use('/cat', cats);
    app.use('/user', users);
    app.use('/images', images);
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        res.status(500);
        res.render('error', { error: err });
    });

    app.listen(port, () => {
        console.log(`Api Running on port ${port}!`);
        console.log(`Web Running on port 3001!`);
        console.log(`Open http://localhost:3001/front.html`);
    });
}

start().then().catch(console.error);
