'use strict';
const catService = require('../services/cat.service');

const getList = async (req, res) => {
    res.send(await catService.getList());
};

const getById = async (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = await catService.getById(catId);
    if (cat && cat.length > 0) {
        res.send(cat[0]);
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
    await catService.save({
        name,
        birthdate,
        weight,
        owner,
        fileName
    });
    res.send({ message: 'Cat Saved!' });
};

const edit = async (req, res) => {
    const { cat_id: id } = req.body ?? {};
    console.log(req.body);
    const cat = await catService.getById(id ?? '');
    if (cat) {
        await catService.edit(req.body ?? {});
        res.send(true);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
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
    getList,
    getById,
    save,
    edit,
    deleteById
};
