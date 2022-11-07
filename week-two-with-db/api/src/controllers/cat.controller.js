'use strict';
// catController
const service = require('../services/cat.service');

const getList = async (req, res) => {
    res.send(await service.getCats());
};

const getById = async (req, res) => {
    const catId = req.params['id'] ?? '';
    const cat = await service.getCatById(catId);
    if (cat && cat.length > 0) {
        res.send(cat[0]);
    } else {
        res.status(404).send({
            error: 'not found'
        });
    }
};

const save = async (req, res) => {
    const { name, birthdate, weight, ownerId } = req.body ?? {};
    const { filename: fileName } = req.file;
    res.send(
        await service.saveCat({
            name,
            birthdate,
            weight,
            ownerId,
            fileName
        })
    );
};

const edit = async (req, res) => {
    const { cat_id } = req.body ?? {};
    console.log(req.body);
    const cat = await service.getCatById(cat_id ?? '');
    if (cat) {
        await service.editCat(req.body ?? {});
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
    edit: edit,
    deleteById: deleteById
};
