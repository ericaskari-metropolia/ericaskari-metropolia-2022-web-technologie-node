'use strict';

const pool = require('../database');
const promisePool = pool.promise();

const getAllCats = async () => {
    try {
        const [rows] = await promisePool.query(
            'SELECT cat_id, filename, wop_cat.name as name, birthdate, weight, wu.name as ownername from wop_cat LEFT JOIN wop_user wu on wu.user_id = wop_cat.owner\n'
        );
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const saveCat = async ({ name, birthdate, weight, ownerId, fileName }) => {
    try {
        // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
        const [rows] = await promisePool.s('SELECT * FROM wop_cat');
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const cats = [
    {
        id: '1',
        name: 'Frank',
        birthdate: '2010-10-30',
        weight: '5',
        owner: '1',
        filename: '300.jpeg'
    },
    {
        id: '2',
        name: 'James',
        birthdate: '2015-12-25',
        weight: '11',
        owner: '2',
        filename: '302.jpeg'
    }
];

module.exports = {
    cats,
    getAllCats
};
