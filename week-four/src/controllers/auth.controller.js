'use strict';

const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const register = async (req, res) => {
    {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    const { name, email, password } = req.body ?? {};

    await userService.save({
        name,
        email,
        password
    });
    res.send({ message: 'User Saved!' });
};

module.exports = {
    register: register
};
