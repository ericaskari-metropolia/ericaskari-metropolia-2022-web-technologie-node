'use strict';

const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();

const controller = require('../controllers/cat.controller');
const uploadService = require('../services/upload.service');

router
    .route('/')
    .get(controller.getList)
    .post(
        uploadService.imageUpload.single('singleImage'),
        body('name').isString(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        body('ownerId').isNumeric(),
        controller.save
    )
    .put(
        body('name').isString(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        body('ownerId').isNumeric(),
        controller.edit
    );

router
    .route('/:id')
    .get(param('id').isNumeric(), controller.getById)
    .delete(param('id').isNumeric(), controller.deleteById);

module.exports = router;
