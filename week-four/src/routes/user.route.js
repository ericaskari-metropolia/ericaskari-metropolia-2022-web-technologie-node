'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const { body, param } = require('express-validator');

router
    .route('/')
    .get(controller.getList)
    .post(
        body('name').isString().isLength({ min: 1 }),
        body('email').isEmail().normalizeEmail(),
        body('password').isString().isLength({ min: 8 }),
        controller.save
    )
    .put(controller.edit);

router
    .route('/:id')
    .get(param('id').isNumeric(), controller.getById)
    .delete(param('id').isNumeric(), controller.deleteById);

module.exports = router;
