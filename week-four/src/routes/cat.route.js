'use strict';

const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();

const controller = require('../controllers/cat.controller');
const uploadService = require('../services/upload.service');
const {
    validateExpectedFields,
    wrapWithErrorHandler
} = require('../services/error-handler.service');

router
    .route('/')
    .get(controller.getList)
    .post(
        uploadService.imageUpload.single('singleImage'),
        body('name').isString(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        body('ownerId').isNumeric(),
        validateExpectedFields('POST /cat'),
        wrapWithErrorHandler(controller.save)
    )
    .put(
        body('name').isString(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        body('ownerId').isNumeric(),
        validateExpectedFields('PUT /cat'),
        wrapWithErrorHandler(controller.edit)
    );

router
    .route('/:id')
    .get(
        param('id').isNumeric(),
        validateExpectedFields('GET /cat/:id'),
        wrapWithErrorHandler(controller.getById)
    )
    .delete(
        param('id').isNumeric(),
        validateExpectedFields('DELETE /cat/:id'),
        wrapWithErrorHandler(controller.deleteById)
    );

module.exports = router;
