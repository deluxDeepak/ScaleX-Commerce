const AppError = require("./AppError");

class FiletypeError extends AppError {
    constructor(message="File type not Supported") {
        super(message, 404)
        this.name = "FiletypeError";

    }
}
module.exports = FiletypeError;