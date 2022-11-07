'use strict';

const catDb = require('../models/cat.model');

const saveCat = (cat, file) => {
    catDb.cats.push({
        ...cat,
        filename: file.filename,
        id: (catDb.cats.length + 1).toString() // based on data
    });

    return catDb.cats[catDb.cats.length - 1];
};
const getCats = () => {
    return catDb.cats;
};

const getCatById = (id) => {
    return catDb.cats.find((x) => x && x.id === id);
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
    getCats,
    getCatById,
    editCat: editCat,
    deleteCatById
};
