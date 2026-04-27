// body-->create /update 
// params = specific resource identify
// query = filtering / searching / pagination or filter/search

/*
    const validate = (schema) => (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        })

        if (error) {
            return res.status(error.statusCode || 400).json({
                message: "Validation error",
                errors: error.details.map((d) => ({
                    feild: d.path.join("."),
                    message: d.message

                }))
            })
        }

        req.body = value;
        next();
    }
*/
const validate = (schema, property = "body") => (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
    })

    if (error) {
        return res.status(error.statusCode || 400).json({
            message: "Validation error",
            errors: error.details.map((d) => ({
                feild: d.path.join("."),
                message: d.message

            }))
        })
    }

    req[property] = value;
    next();
}

/*
    validate(productSchema, "body");
    validate(querySchema, "query");
    validate(paramsSchema, "params");
*/

module.exports = validate;