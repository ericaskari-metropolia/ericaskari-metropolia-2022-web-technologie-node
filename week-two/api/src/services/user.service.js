'use strict';

const userDb = require('../models/user.model');

const saveUser = (user) => {
    userDb.users.push({
        ...user,
        id: (userDb.users.length + 1).toString() // based on data
    });

    const savedUser = userDb.users[userDb.users.length - 1];
    savedUser.password = '';
    return savedUser;
};
const getUsers = () => {
    return userDb.users.map((user) => {
        return {
            ...user,
            password: ''
        };
    });
};

const getUserById = (id) => {
    const user = userDb.users.find((x) => x && x.id === id);
    if (user) {
        user.password = '';
    }
    return user;
};

const editUser = (id, user) => {
    const currentUserIndex = userDb.users.findIndex((x) => x && x.id === id);
    if (currentUserIndex >= 0) {
        //  Happening in memory.
        userDb.users[currentUserIndex] = user;
        return true;
    }
    return false;
};

const deleteUserById = (id) => {
    const currentUserIndex = userDb.users.findIndex((x) => x && x.id === id);
    if (currentUserIndex >= 0) {
        //  Happening in memory.
        userDb.users.splice(currentUserIndex, 1);
        return true;
    }
    return false;
};

//  CRUD
module.exports = {
    saveUser,
    getUsers,
    getUserById,
    editUser,
    deleteUserById
};
