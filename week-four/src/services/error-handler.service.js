'use strict';
const { validationResult } = require('express-validator');

const globalErrorHandler = () => {
    return (error, request, response, next) => {
        // Error handling middleware functionality
        console.log(`error ${error.message}`); // log the error
        const status = error.status || 400;
        // send back an easily understandable error message to the caller
        response.status(status).send({
            message: error.clientMessage ?? 'Something went wrong!'
        });
    };
};

const validateExpectedFields = (routeName) => {
    return (req, res, next) => {
        const errors = validationResult(req);
        console.log(`${routeName} validation errors:`, errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    };
};
const wrapWithErrorHandler = (handler = async (req, res) => {}) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (e) {
            next(e);
        }
    };
};
module.exports = {
    validateExpectedFields,
    wrapWithErrorHandler: wrapWithErrorHandler,
    globalErrorHandler: globalErrorHandler
};
