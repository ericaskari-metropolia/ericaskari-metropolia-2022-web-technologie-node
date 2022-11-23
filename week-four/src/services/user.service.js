'use strict';

const { db } = require('../database');

const save = async ({ name, email, password, role = 0 }) => {
    await db.query(
        'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
    );
};

const getList = async () => {
    const [rows] = await db.query('SELECT * from user');
    return rows.map(({ id, name, email, password, role }) => ({
        id,
        name,
        email,
        password,
        role
    }));
};

const getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM user WHERE id = ?', [id]);
    if (rows.length === 0) {
        return null;
    }
    {
        const { id, name, email, password, role } = rows[0];
        return {
            id,
            name,
            email,
            password,
            role
        };
    }
};

const edit = async (user) => {
    const remoteUser = await getById(user.id ?? '');
    if (remoteUser) {
        const { id, name, email, password, role } = {
            ...remoteUser,
            ...user
        };
        await db.query(
            'UPDATE user SET name = ?, email = ?, password = ?, role = ? WHERE id = ?',
            [name, email, password, role, id]
        );
    }
};

const deleteById = async (id) => {
    await db.query('DELETE FROM user WHERE id = ?', [id]);
};

//  CRUD
module.exports = {
    save: save,
    getList: getList,
    getById: getById,
    edit: edit,
    deleteById: deleteById
};
