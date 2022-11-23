/// <reference path="../types" />
'use strict';

const userService = require('../services/user.service');
const catService = require('../services/cat.service');

const getList = async (req, res) => {
    res.send(await userService.getList());
};

const getById = async (req, res) => {
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
    const { user } = req;
    const { name, email, password } = req.body ?? {};
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
    await userService.patch(req.body, {
        allowNameUpdate: true,
        allowEmailUpdate: true
    });

    res.status(200).send({
        message: 'User updated!'
    });
};

const deleteById = async (req, res) => {
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
