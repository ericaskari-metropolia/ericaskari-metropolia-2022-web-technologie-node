'use strict';
const { cleanEnv, str, bool, host, port } = require('envalid');
require('dotenv').config();

const environment = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    APP_DB_HOST: host({ devDefault: 'localhost' }),
    APP_DB_USER: str({ devDefault: 'eric' }),
    APP_DB_PASS: str({ devDefault: 'eric1234' }),
    APP_DB_NAME: str({ devDefault: 'eric-db' })
});

module.exports = environment;
