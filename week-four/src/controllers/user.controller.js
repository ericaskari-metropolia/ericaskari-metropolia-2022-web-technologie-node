'use strict';

const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

const getList = async (req, res) => {
    res.send(await userService.getList());
};

const getById = async (req, res) => {
    {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    const catId = req.params['id'] ?? '';
    const user = await userService.getById(catId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = async (req, res) => {
    {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    const { name, email, password } = req.body ?? {};
    const { filename: fileName } = req.file ?? {};
    console.log(req.body);
    console.log(req.file);
    await userService.save({
        name,
        email,
        password
    });
    res.send({ message: 'User Saved!' });
};

const edit = async (req, res) => {
    {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    const { id } = req.body ?? {};
    console.log(req.body);
    const user = await userService.getById(id ?? '');
    if (user) {
        await userService.edit(req.body ?? {});
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const deleteById = async (req, res) => {
    {
        const errors = validationResult(req);
        console.log({ errors });
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }

    const catId = req.params['id'] ?? '';
    const user = userService.getById(catId);
    if (user) {
        await userService.deleteById(catId);
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

module.exports = {
    getList,
    getById,
    save,
    edit,
    deleteById
};
