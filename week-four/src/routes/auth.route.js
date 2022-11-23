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
const { authenticateJWT } = require('../services/auth.service');

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
        validateExpectedFields('/login'),
        passport.authenticate('local'),
        wrapWithErrorHandler(controller.login)
    );

router
    .route('/token')
    .get(authenticateJWT(), wrapWithErrorHandler(controller.token));

module.exports = router;
