'use strict';
const catService = require('../services/cat.service');
const { validationResult } = require('express-validator');

const getList = async (req, res) => {
    res.send(await catService.getList());
};

const getById = async (req, res) => {
    const catId = req.params['id'] ?? '';
    console.log(catId);
    const cat = await catService.getById(catId);
    console.log(cat);
    if (cat) {
        res.send(cat);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = async (req, res) => {
    const { user } = req;
    const { name, birthdate, weight } = req.body ?? {};
    const { filename: fileName } = req.file ?? {};

    console.log(req.body);
    console.log(req.file);
    await catService.save({
        name: name,
        weight: weight,
        fileName: fileName,
        birthdate: birthdate,
        ownerId: user.id
    });
    res.send({ message: 'Cat Saved!' });
};

const edit = async (req, res) => {
    await catService.patch(req.body, {
        allowNameUpdate: true,
        allowBirthdateUpdate: true,
        allowWeightUpdate: true
    });

    res.status(200).send({
        message: 'Cat updated!'
    });
};

const deleteById = async (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = catService.getById(catId);
    if (cat) {
        await catService.deleteById(catId);
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

module.exports = {
    getList: getList,
    getById: getById,
    save: save,
    edit: edit,
    deleteById: deleteById
};
