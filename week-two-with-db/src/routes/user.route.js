'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router
    .route('/')
    .get(controller.getList)
    .post(controller.save)
    .put(controller.edit);

router.route('/:id').get(controller.getById).delete(controller.deleteById);

module.exports = router;
