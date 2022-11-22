'use strict';
const express = require('express');
const app = express();
const port = 3000;
const passport = require('./utils/pass');
const { query, validationResult, param } = require('express-validator');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const loggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/form');
    }
};

app.use(cookieParser());
app.use(morgan('tiny'));

// app.use(passport.initialize());
// app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'pug');

// app.post(
//     '/login',
//     passport.authenticate('local', { failureRedirect: '/form' }),
//     (req, res) => {
//         console.log('success');
//         res.redirect('/secret');
//     }
// );

app.get('/setCookie/:clr', param('clr').isString(), (req, res) => {
    {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
    const { clr = '' } = req.params;
    res.cookie('color', clr, { maxAge: 500000, httpOnly: true });
    res.send({ clr });
});

app.get('/getCookie', (req, res) => {
    const { clr = '' } = req.query;
    const { color = '' } = req.cookies ?? {};
    res.send({ color });
});

app.get('/deleteCookie', (req, res) => {
    res.cookie('color', '', { maxAge: 0, httpOnly: true });
    res.send({ color: '' });
});

app.get('/secret', loggedIn, (req, res) => {
    res.render('secret');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
