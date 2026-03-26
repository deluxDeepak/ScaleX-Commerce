const AppError = require("./AppError");

class NotfoundError extends AppError{
    constructor(message="Resource not found"){
        super(message,404)
        this.name="Notfound Error"
    }
}
module.exports=NotfoundError