'use strict';
const mysql = require('mysql2');
const environment = require('./environment');

const pool = mysql.createPool({
    host: environment.APP_DB_HOST,
    user: environment.APP_DB_USER,
    password: environment.APP_DB_PASS,
    database: environment.APP_DB_NAME,
    port: '3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
