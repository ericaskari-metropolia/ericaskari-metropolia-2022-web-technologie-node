'use strict';

const { db } = require('../database');

const save = async ({ name, email, password, role = 0 }) => {
    await db.query(
        'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role]
    );
    return await getByEmail(email);
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

const getByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [
        email
    ]);
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
    return await getById(user.id ?? '');
};

const deleteById = async (id) => {
    await db.query('DELETE FROM user WHERE id = ?', [id]);
};

const patch = async (model, allowedKeys) => {
    const dbModel = await getById(model.id);

    if (!dbModel) {
        throw new Error('NOT_FOUND');
    }

    {
        //  property protection
        Object.entries(model).forEach(([key, apiValue]) => {
            const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);
            const allowedKey = `allow${capitalKey}Update`;

            if (allowedKeys[allowedKey]) {
                dbModel[key] = apiValue;
            }
        });
    }

    return await edit(model);
};

//  CRUD
module.exports = {
    save: save,
    getList: getList,
    getById: getById,
    getByEmail: getByEmail,
    deleteById: deleteById,
    patch: patch
};
