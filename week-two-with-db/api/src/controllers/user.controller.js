'use strict';

const service = require('../services/user.service');

const getList = async (req, res) => {
    res.send(await service.getUsers());
};

const getById = async (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = await service.getUserById(catId);
    if (cat && cat.length > 0) {
        res.send(cat[0]);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = async (req, res) => {
    const { name, email, password } = req.body ?? {};
    res.send(
        await service.saveUser({
            name,
            email,
            password,
            role: 1
        })
    );
};

const edit = async (req, res) => {
    const { user_id } = req.body ?? {};
    console.log(req.body);
    const cat = await service.getUsers(user_id ?? '');
    if (cat) {
        await service.editUser(req.body ?? {});
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const deleteById = async (req, res) => {
    const id = req.params['id'] ?? '';
    const cat = service.getUserById(id);
    if (cat) {
        await service.deleteUserById(id);
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

module.exports = {
    save: save,
    getList: getList,
    getById: getById,
    edit: edit,
    deleteById: deleteById
};
