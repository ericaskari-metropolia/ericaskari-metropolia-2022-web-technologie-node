'use strict';
// catController
const service = require('../services/cat.service');
const multer = require('multer');

const getList = (req, res) => {
    res.send(service.getCats());
};

const getById = (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = service.getCatById(catId);
    if (cat) {
        res.send(cat);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = (req, res) => {
    res.send(service.saveCat(req.body, req.file));
};

const editById = (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = service.getCatById(catId);
    if (cat) {
        service.editCat(catId, req.body);
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const deleteById = (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = service.getCatById(catId);
    if (cat) {
        service.deleteCatById(catId);
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
    editById: editById,
    deleteById: deleteById
};
