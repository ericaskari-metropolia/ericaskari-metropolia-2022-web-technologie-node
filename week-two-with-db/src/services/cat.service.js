'use strict';

const { db } = require('../database');

const save = async ({ name, birthdate, weight, owner, fileName }) => {
    console.log({ name, birthdate, weight, owner, fileName });
    await db.query('INSERT INTO `wop_cat` (`name`, `weight`, `owner`, `filename`, `birthdate`) VALUES (?, ?, ?, ?, ?)', [
        name,
        weight,
        owner,
        fileName,
        birthdate
    ]);
};

const getList = async () => {
    const [rows] = await db.query(
        'SELECT cat_id, filename, wop_cat.name as name, birthdate, weight, wu.name as ownername from wop_cat LEFT JOIN wop_user wu on wu.user_id = wop_cat.owner'
    );
    return rows;
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    return rows;
};

const edit = async (cat) => {
    const remoteCat = await getById(cat?.cat_id ?? '');
    if (remoteCat) {
        const { name, weight, birthdate, filename, cat_id, owner } = {
            ...remoteCat,
            ...cat
        };
        await db.query('UPDATE `wop_cat` SET name = ?, weight = ?, birthdate = ?, filename = ? , owner = ? WHERE cat_id = ?', [
            name,
            weight,
            birthdate,
            filename,
            owner,
            cat_id
        ]);
    }
};

const deleteById = async (id) => {
    await db.query('DELETE FROM `wop_cat` WHERE cat_id = ?', [id]);
};

//  CRUD
module.exports = {
    save: save,
    getList,
    getById,
    edit,
    deleteById
};
