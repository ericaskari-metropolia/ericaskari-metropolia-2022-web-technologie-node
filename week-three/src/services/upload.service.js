'use strict';

const multer = require('multer');
const { randomUUID } = require('crypto');
const path = require('path');

// Image Upload
const imageStorage = multer.diskStorage({
    destination: 'uploads', // Destination to store image
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const id = `${randomUUID()}${extension}`;
        cb(null, id);
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'));
        }
        cb(undefined, true);
    }
});

//  CRUD
module.exports = {
    imageStorage,
    imageUpload
};
