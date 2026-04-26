const joi = require("joi");

// Create a Body schema
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

    subCategory: joi.string().trim().required().messages({
        "string.empty": "Subcategory is required",
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

// All the fields are optional here 
const updateProductSchema = productSchema.fork(
    ["title", "description", "price", "category", "subCategory"],
    (field) => field.optional()
);

// Create a params Schema 
const productParamsSchema = joi.object({
    productId: joi
        .string()
        .length(24) // MongoDB ObjectId 
        .hex()
        .required()
        .messages({
            "string.length": "Invalid product ID",
            "any.required": "Product ID is required",
        }),
})

// Create a query schema -->get products 
const productQuerySchema = joi.object({
    category: joi.string().trim(),
    page: joi.number().integer().min(1).default(1),
    limit: joi.number().integer().min(1).max(100).default(10),
    sort: joi.string().valid("price_asc", "price_desc", "newest"),
    minPrice: joi.number().min(0),
    maxPrice: joi.number().min(0),
});



// Updated all fileds optional bana dega 
/*
    schema.describe() -->Returns schema internal struture
    {
        "type": "object",
        "keys": {
            "title": {
            "type": "string",
            "flags": { "presence": "required" }
            },
            "price": {
            "type": "number"
            }
        }
    }

    schema.describe().keys -->Return the feilds
    {
        title: {...},
        description: {...},
        price: {...},
        category: {...}
    }


    Object.keys(bodySchema.describe().keys)--->convert objects into array
    ["title", "description", "price", "category", "stock", ...]

*/
const updateProductSchemaAllFields = productSchema.fork(
    Object.keys(productSchema.describe().keys),
    (field) => field.optional()
);

module.exports = {
    productSchema,
    updateProductSchema,
    productParamsSchema,
    productQuerySchema,
    updateProductSchemaAllFields
}

