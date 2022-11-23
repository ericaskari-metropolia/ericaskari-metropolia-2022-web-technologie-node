'use strict';

const express = require('express');
const fs = require('fs');
const router = express.Router();

/**
 * With this endpoint you can get cats.
 */
router.get('/:id', (req, res) => {
    const imageId = req.params['id'] ?? '';
    fs.readFile(`uploads/${imageId}`, {}, (err, data) => {
        res.send(data);
    });
});

module.exports = router;
