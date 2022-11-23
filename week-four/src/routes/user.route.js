'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const { body, param } = require('express-validator');
const {
    validateExpectedFields,
    wrapWithErrorHandler
} = require('../services/error-handler.service');
const { handleTokenUser } = require('../services/auth.service');

router
    .route('/')
    .get(wrapWithErrorHandler(controller.getList))
    .post(
        body('name').isString().isLength({ min: 1 }),
        body('email').isEmail().normalizeEmail(),
        body('password').isString().isLength({ min: 8 }),
        validateExpectedFields('POST /user'),
        wrapWithErrorHandler(controller.save)
    )
    .put(wrapWithErrorHandler(controller.edit));

router
    .route('/:id')
    .get(
        param('id').isString(),
        validateExpectedFields('GET /user/:id'),
        handleTokenUser(),
        param('id').isNumeric(),
        validateExpectedFields('GET /user/:id'),
        wrapWithErrorHandler(controller.getById)
    )
    .delete(
        param('id').isNumeric(),
        validateExpectedFields('DELETE /user/:id'),
        wrapWithErrorHandler(controller.deleteById)
    );

module.exports = router;
