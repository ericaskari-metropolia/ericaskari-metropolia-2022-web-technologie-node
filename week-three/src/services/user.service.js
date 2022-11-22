'use strict';

const { db } = require('../database');

const save = async ({ name, email, password, role }) => {
    try {
        await db.query('INSERT INTO `wop_user` (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)', [name, email, password, role]);
    } catch (e) {
        console.error('error', e.message);
    }
};

const getList = async () => {
    try {
        const [rows] = await db.query('SELECT * from `wop_user`');
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const getById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM wop_user WHERE user_id = ?', [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const edit = async (user) => {
    try {
        const remoteUser = await getById(user?.user_id ?? '');
        if (remoteUser) {
            const { name, email, password, role, user_id } = {
                ...remoteUser,
                ...user
            };
            await db.query('UPDATE `wop_user` SET name = ?, email = ?, password = ?, role = ? WHERE user_id = ?', [
                name,
                email,
                password,
                role,
                user_id
            ]);
        }
    } catch (e) {
        console.error('error', e.message);
    }
};

const deleteById = async (id) => {
    try {
        await db.query('DELETE FROM `wop_user` WHERE user_id = ?', [id]);
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
