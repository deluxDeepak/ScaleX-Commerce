const joi = require("joi");

// Create a schema
const productSchema = joi.object({
    title: joi.string().trim().min(2).max(120).required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title cannot be empty",
        "string.min": "Title should have at least 2 characters",
        "any.required": "Title is required",
    }),

    description: joi.string().trim().min(5).max(2000).required().messages({
        "string.empty": "Description cannot be empty",
        "string.min": "Description should be at least 5 characters",
        "any.required": "Description is required",
    }),

    price: joi.number().min(0).required().messages({
        "number.base": "Price must be a number",
        "number.min": "Price cannot be negative",
        "any.required": "Price is required",
    }),

    category: joi.string().trim().required().messages({
        "string.empty": "Category is required",
    }),

    brand: joi.string().trim().allow("", null),

    stock: joi.number().integer().min(0).default(0).messages({
        "number.base": "Stock must be a number",
        "number.min": "Stock cannot be negative",
    }),

    images: joi.array().items(joi.string().uri()).default([]).messages({
        "string.uri": "Each image must be a valid URL",
    }),

    isActive: joi.boolean().default(true),
});

// Create middleware (Make generic for resue the middleware )
// const validateProduct = (req, res, next) => {
//     const { error, value } = productSchema.validate(req.body, {
//         abortEarly: false,
//         stripUnknown: true,
//     });

//     if (error) {
//         return res.status(400).json({
//             message: "Validation error",
//             errors: error.details.map((d) => d.message),
//         });
//     }

//     req.body = value;
//     next();
// };

module.exports = productSchema

