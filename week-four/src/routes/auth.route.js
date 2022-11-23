'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router
    .route('/register')
    .post(
        body('name').isString().isLength({ min: 1 }),
        body('email').isEmail().normalizeEmail(),
        body('password').isString().isLength({ min: 8 }),
        controller.register
    );

module.exports = router;
