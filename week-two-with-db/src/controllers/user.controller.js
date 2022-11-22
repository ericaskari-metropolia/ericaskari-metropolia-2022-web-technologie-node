'use strict';

const userService = require('../services/user.service');

const getList = async (req, res) => {
    res.send(await userService.getList());
};

const getById = async (req, res) => {
    const catId = req.params['id'] ?? '';
    const user = await userService.getById(catId);
    if (user && user.length > 0) {
        res.send(user[0]);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = async (req, res) => {
    const { name, birthdate, weight, owner } = req.body ?? {};
    const { filename: fileName } = req.file ?? {};
    console.log(req.body);
    console.log(req.file);
    res.send(
        await userService.save({
            name,
            birthdate,
            weight,
            owner,
            fileName
        })
    );
};

const edit = async (req, res) => {
    const { user_id: id } = req.body ?? {};
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
