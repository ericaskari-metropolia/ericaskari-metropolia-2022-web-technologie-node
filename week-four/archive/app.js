'use strict';
const express = require('express');
const app = express();
const port = 3000;
const passport = require('./utils/pass');
const { query, validationResult, param, body } = require('express-validator');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { randomUUID } = require('crypto');

const username = 'foo';
const password = 'bar';

const validate = (routeName) => {
    return (req, res, next) => {
        const errors = validationResult(req);
        console.log(`${routeName} validation errors:`, errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    };
};
const loggedIn = (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.redirect('/form');
    }
};

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'pug');

app.get(
    '/setCookie/:clr',
    param('clr').isString(),
    validate('/setCookie/:clr'),
    (req, res) => {
        const { clr = '' } = req.params;
        res.cookie('color', clr, { maxAge: 500000, httpOnly: true });
        res.send({ clr });
    }
);

app.get('/getCookie', (req, res) => {
    const { clr = '' } = req.query;
    const { color = '' } = req.cookies ?? {};
    res.send({ color });
});

app.get('/deleteCookie', (req, res) => {
    res.cookie('color', '', { maxAge: 0, httpOnly: true });
    res.send({ color: '' });
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.get(
    '/secret',
    passport.authorize('session', { failureRedirect: '/form' }),
    loggedIn,
    (req, res) => {
        console.log(req.session);
        console.log(req.cookies);
        console.log(req.user);
        res.render('secret');
    }
);

app.post(
    '/login',
    body('username').isString(),
    body('password').isString(),
    validate('/login'),
    passport.authenticate('local', { failureRedirect: '/form' }),
    (req, res) => {
        res.redirect('/secret');
    }
);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
