'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const controller = require('../controllers/auth.controller');
const {
    validateExpectedFields,
    wrapWithErrorHandler
} = require('../services/error-handler.service');
const passport = require('../../archive/utils/pass');

router
    .route('/register')
    .post(
        body('name').isString().isLength({ min: 1 }),
        body('email').isEmail().normalizeEmail(),
        body('password').isString().isLength({ min: 8 }),
        validateExpectedFields('/register'),
        wrapWithErrorHandler(controller.register)
    );
router
    .route('/login')
    .post(
        body('username').isEmail().normalizeEmail(),
        body('password').isString(),
        passport.authenticate('local'),
        validateExpectedFields('/register'),
        wrapWithErrorHandler(controller.login)
    );

module.exports = router;
