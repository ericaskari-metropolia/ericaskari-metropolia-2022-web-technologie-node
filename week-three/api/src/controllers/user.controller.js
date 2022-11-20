'use strict';

const defaultUserService = require('../services/user.service');

class UserController {
    static _instance;

    userService;

    constructor(userService) {
        this.userService = userService;
    }

    static instance(userService = defaultUserService) {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new UserController(userService);
        return this._instance;
    }

    getList = async (req, res) => {
        res.send(await this.userService.getList());
    };

    getById = async (req, res) => {
        const catId = req.params['id'] ?? '';
        const user = await this.userService.getById(catId);
        if (user && user.length > 0) {
            res.send(user[0]);
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
            await this.userService.save({
                name,
                birthdate,
                weight,
                owner,
                fileName
            })
        );
    };

    edit = async (req, res) => {
        const { user_id: id } = req.body ?? {};
        console.log(req.body);
        const user = await this.userService.getById(id ?? '');
        if (user) {
            await this.userService.edit(req.body ?? {});
            res.send(true);
        } else {
            res.status(404).send({
                error: 'not found'
            });
        }
    };

    deleteById = async (req, res) => {
        const catId = req.params['id'] ?? '';
        const user = this.userService.getById(catId);
        if (user) {
            await this.userService.deleteById(catId);
            res.send(true);
        } else {
            res.status(404).send({
                error: 'not found'
            });
        }
    };
}

module.exports = UserController;
