'use strict';
// catController
const defaultCatService = require('../services/cat.service');

class CatController {
    static _instance;

    catService;

    constructor(catService) {
        this.catService = catService;
    }

    static instance(catService = defaultCatService) {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new CatController(catService);
        return this._instance;
    }

    getList = async (req, res) => {
        res.send(await this.catService.getList());
    };

    getById = async (req, res) => {
        const catId = req.params['id'] ?? '';
        const cat = await this.catService.getById(catId);
        if (cat && cat.length > 0) {
            res.send(cat[0]);
        } else {
            res.status(404).send({
                error: 'not found'
            });
        }
    };

    save = async (req, res) => {
        const { name, birthdate, weight, owner } = req.body ?? {};
        const { filename: fileName } = req.file;
        console.log(req.body);
        console.log(req.file);
        res.send(
            await this.catService.save({
                name,
                birthdate,
                weight,
                owner,
                fileName
            })
        );
    };

    edit = async (req, res) => {
        const { cat_id: id } = req.body ?? {};
        console.log(req.body);
        const cat = await this.catService.getById(id ?? '');
        if (cat) {
            await this.catService.edit(req.body ?? {});
            res.send(true);
        } else {
            res.status(404).send({
                error: 'not found'
            });
        }
    };

    deleteById = async (req, res) => {
        const catId = req.params['id'] ?? '';
        const cat = this.catService.getById(catId);
        if (cat) {
            await this.catService.deleteById(catId);
            res.send(true);
        } else {
            res.status(404).send({
                error: 'not found'
            });
        }
    };
}

module.exports = CatController;
