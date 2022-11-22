'use strict';

const { db } = require('../database');

const save = async ({ name, weight, ownerId, fileName, birthdate }) => {
    await db.query(
        'INSERT INTO cat (name, weight, owner_id, file_name, birthdate) VALUES (?, ?, ?, ?, ?)',
        [name, weight, ownerId, fileName, birthdate]
    );
};

const getList = async () => {
    const [rows] = await db.query(
        'SELECT cat.id as id, cat.name as name, weight, owner_id, file_name, birthdate, user.name as owner_name from cat LEFT JOIN user user on user.id = cat.owner_id'
    );
    return rows.map(
        ({ id, name, weight, owner_id, owner_name, file_name, birthdate }) => ({
            id,
            name,
            weight,
            ownerId: owner_id,
            ownerName: owner_name,
            fileName: file_name,
            birthdate
        })
    );
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM cat WHERE id = ?', [id]);
    if (rows.length === 0) {
        return null;
    }
    {
        const { id, name, weight, owner_id, file_name, birthdate } = rows[0];
        return {
            id,
            name,
            weight,
            ownerId: owner_id,
            fileName: file_name,
            birthdate
        };
    }
};

const edit = async (cat) => {
    const remoteCat = await getById(cat?.id ?? '');
    if (remoteCat) {
        const { id, name, weight, ownerId, fileName, birthdate } = {
            ...remoteCat,
            ...cat
        };
        await db.query(
            'UPDATE cat SET name = ?, weight = ?, birthdate = ?, file_name = ? , owner_id = ? WHERE id = ?',
            [name, weight, birthdate, fileName, ownerId, id]
        );
    }
};

const deleteById = async (id) => {
    await db.query('DELETE FROM cat WHERE id = ?', [id]);
};

//  CRUD
module.exports = {
    save: save,
    getList: getList,
    getById: getById,
    edit: edit,
    deleteById: deleteById
};
