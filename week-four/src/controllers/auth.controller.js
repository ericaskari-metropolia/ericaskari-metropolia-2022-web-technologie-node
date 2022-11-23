'use strict';

const userService = require('../services/user.service');
const { createUserLoginToken } = require('../services/jwt.service');

const register = async (req, res, next) => {
    const { name, email, password } = req.body ?? {};

    const user = await userService.save({
        name,
        email,
        password
    });

    const { accessToken, expiresAt } = createUserLoginToken(user.id);
    res.send({ message: 'User Saved!', user, accessToken, expiresAt });
};

const login = async (req, res, next) => {
    const { user = {} } = req;
    console.log('login: ', user);
    const { accessToken, expiresAt } = createUserLoginToken(user.id);

    res.send({ message: 'User logged in!', user, accessToken, expiresAt });
};

const token = async (req, res, next) => {
    console.log(req.headers);
    res.send({ user: req.user ?? {} });
};

module.exports = {
    register: register,
    login: login,
    token: token
};
