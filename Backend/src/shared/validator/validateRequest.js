const logger = require("../../core/logger/logger");

const validateRequest = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });
    logger.info({ value }, "Validate value| requestValidator runs");

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }

    req.body = value;
    next();
}

module.exports=validateRequest;
