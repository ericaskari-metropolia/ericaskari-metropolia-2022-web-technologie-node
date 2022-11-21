'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

/**
 * With this endpoint you can get cats.
 */
router.get('/', controller.getList);

/**
 * With this endpoint you can get details of a cat with id
 */
router.get('/:id', controller.getById);

/**
 * With this endpoint you can add cats.
 */
router.post('/', controller.save);

/**
 * With this endpoint you can edit cat by id.
 */
router.put('/:id', controller.editById);

/**
 * With this endpoint you can delete a cat by id
 */
router.delete('/:id', controller.deleteById);

module.exports = router;
