'use strict';

const catDb = require('../models/cat.model');
const pool = require('../database');
const promisePool = pool.promise();

const saveCat = async ({ name, birthdate, weight, ownerId, fileName }) => {
    try {
        await promisePool.query('INSERT INTO `wop_cat` (`name`, `weight`, `owner`, `filename`, `birthdate`) VALUES (?, ?, ?, ?, ?)', [
            name,
            weight,
            ownerId,
            fileName,
            birthdate
        ]);
    } catch (e) {
        console.error('error', e.message);
    }
};

const getCats = async () => {
    try {
        const [rows] = await promisePool.query(
            'SELECT cat_id, filename, wop_cat.name as name, birthdate, weight, wu.name as ownername from wop_cat LEFT JOIN wop_user wu on wu.user_id = wop_cat.owner'
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const getCatById = async (id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const editCat = async (cat) => {
    try {
        const remoteCat = await getCatById(cat?.cat_id ?? '');
        if (remoteCat) {
            const { name, weight, birthdate, filename, cat_id } = {
                ...remoteCat,
                ...cat
            };
            await promisePool.query('UPDATE `wop_cat` SET name = ?, weight = ?, birthdate = ?, filename = ? WHERE cat_id = ?', [
                name,
                weight,
                birthdate,
                filename,
                cat_id
            ]);
        }
    } catch (e) {
        console.error('error', e.message);
    }
};

const deleteCatById = (id) => {
    const currentCatIndex = catDb.cats.findIndex((x) => x && x.id === id);
    if (currentCatIndex >= 0) {
        //  Happening in memory.
        catDb.cats.splice(currentCatIndex, 1);
        return true;
    }
    return false;
};

//  CRUD
module.exports = {
    saveCat: saveCat,
    getCats: getCats,
    getCatById: getCatById,
    editCat: editCat,
    deleteCatById: deleteCatById
};
