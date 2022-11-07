'use strict';

const pool = require('../database');
const promisePool = pool.promise();

const saveUser = async ({ name, email, password, role }) => {
    try {
        await promisePool.query('INSERT INTO `wop_user` (`name`, `email`, `password`, `role`) VALUES (?, ?, ?, ?)', [
            name,
            email,
            password,
            role
        ]);
    } catch (e) {
        console.error('error', e.message);
    }
};

const getUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * from `wop_user`');
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const getUserById = async (id) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM wop_user WHERE user_id = ?', [id]);
        return rows;
    } catch (e) {
        console.error('error', e.message);
    }
};

const editUser = async (user) => {
    try {
        const remoteUser = await getUserById(user?.user_id ?? '');
        if (remoteUser) {
            const { name, email, password, role, user_id } = {
                ...remoteUser,
                ...user
            };
            await promisePool.query('UPDATE `wop_user` SET name = ?, email = ?, password = ?, role = ? WHERE user_id = ?', [
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

const deleteUserById = async (id) => {
    try {
        await promisePool.query('DELETE FROM `wop_user` WHERE user_id = ?', [id]);
    } catch (e) {
        console.error('error', e.message);
    }
};

//  CRUD
module.exports = {
    saveUser: saveUser,
    getUsers: getUsers,
    getUserById: getUserById,
    editUser: editUser,
    deleteUserById: deleteUserById
};
