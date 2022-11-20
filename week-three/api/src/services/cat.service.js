'use strict';

const pool = require('../database');
const promisePool = pool.promise();

const save = async ({ name, birthdate, weight, owner, fileName }) => {
    try {
        await promisePool.query('INSERT INTO `wop_cat` (`name`, `weight`, `owner`, `filename`, `birthdate`) VALUES (?, ?, ?, ?, ?)', [
            name,
            weight,
            owner,
            fileName,
            birthdate
        ]);
    } catch (e) {
        console.error('error', e.message);
    }
};

const getList = async () => {
    try {
        const [rows] = await promisePool.query(
            'SELECT cat_id, filename, wop_cat.name as name, birthdate, weight, wu.name as ownername from wop_cat LEFT JOIN wop_user wu on wu.user_id = wop_cat.owner'
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const getById = async (id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const edit = async (cat) => {
    try {
        const remoteCat = await getById(cat?.cat_id ?? '');
        if (remoteCat) {
            const { name, weight, birthdate, filename, cat_id, owner } = {
                ...remoteCat,
                ...cat
            };
            await promisePool.query('UPDATE `wop_cat` SET name = ?, weight = ?, birthdate = ?, filename = ? , owner = ? WHERE cat_id = ?', [
                name,
                weight,
                birthdate,
                filename,
                owner,
                cat_id
            ]);
        }
    } catch (e) {
        console.error('error', e.message);
    }
};

const deleteById = async (id) => {
    try {
        await promisePool.query('DELETE FROM `wop_cat` WHERE cat_id = ?', [id]);
    } catch (e) {
        console.error('error', e.message);
    }
};

//  CRUD
module.exports = {
    save,
    getList,
    getById,
    edit,
    deleteById
};
