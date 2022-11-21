'use strict';

const service = require('../services/user.service');

const getList = (req, res) => {
    res.send(service.getUsers());
};

const getById = (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = service.getUserById(catId);
    if (cat) {
        res.send(cat);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = (req, res) => {
    res.send(service.saveUser(req.body));
};

const editById = (req, res) => {
    const catId = req.params['id'] ?? '';
    res.send(service.editUser(catId, req.body));
};

const deleteById = (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = service.getUserById(catId);
    if (cat) {
        service.deleteUserById(catId);
        res.send(cat);
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
    editById: editById,
    deleteById: deleteById
};
