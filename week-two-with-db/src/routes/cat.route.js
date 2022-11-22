'use strict';

const express = require('express');
const router = express.Router();

const controller = require('../controllers/cat.controller');
const uploadService = require('../services/upload.service');

router
    .route('/')
    .get(controller.getList)
    .post(uploadService.imageUpload.single('cat'), controller.save)
    .put(controller.edit);

router.route('/:id').get(controller.getById).delete(controller.deleteById);

module.exports = router;
