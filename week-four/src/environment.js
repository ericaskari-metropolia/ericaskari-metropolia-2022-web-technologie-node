'use strict';
const { cleanEnv, str, bool, host, port } = require('envalid');
require('dotenv').config();

const environment = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production'] }),
    APP_DB_HOST: host({ devDefault: 'localhost' }),
    APP_DB_USER: str({ devDefault: 'metropolia' }),
    APP_DB_PASS: str({ devDefault: 'metropolia' }),
    APP_DB_NAME: str({ devDefault: 'metropolia' })
});

module.exports = environment;
