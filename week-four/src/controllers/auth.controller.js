'use strict';

const userService = require('../services/user.service');
const { createUserLoginToken } = require('../services/jwt.service');

const register = async (req, res, next) => {
    const { name, email, password } = req.body ?? {};

    const user = await userService.save(
        {
            name,
            email,
            password
        },
        next
    );

    const { accessToken, expiresAt } = createUserLoginToken(user.id);
    res.send({ message: 'User Saved!', user, accessToken, expiresAt });
};

const login = async (req, res, next) => {
    res.send({ message: 'User logged in!' });
};

module.exports = {
    register: register,
    login: login
};
