'use strict';

const catDb = require('../models/cat.model');
const pool = require('../database');
const promisePool = pool.promise();

const saveCat = (cat, file) => {
    catDb.cats.push({
        ...cat,
        filename: file.filename,
        id: (catDb.cats.length + 1).toString() // based on data
    });

    return catDb.cats[catDb.cats.length - 1];
};

const getCats = async () => {
    try {
        const [rows] = await promisePool.query(
            'SELECT cat_id, filename, wop_cat.name as name, birthdate, weight, wu.name as ownername from wop_cat LEFT JOIN wop_user wu on wu.user_id = wop_cat.owner\n'
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

const editCat = (id, cat) => {
    const currentCatIndex = catDb.cats.findIndex((x) => x && x.id === id);
    if (currentCatIndex >= 0) {
        //  Happening in memory.
        catDb.cats[currentCatIndex] = {
            ...cat,
            id
        };
        return true;
    }
    return false;
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
