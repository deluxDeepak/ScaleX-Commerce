// NOTE: Normalized AppError import casing.
const AppError = require("./AppError");

class ValidationError extends AppError {
    constructor(message = "Invalid Input") {
        super(message, 400);
        this.name = "ValidationError";
    }
}

module.exports = ValidationError


/*

    // ==========Error constructor sirf message leta hai====================
    class validationError extends Error{
        constructor(message,code){
            // Super call karna parega agr inherit kar rehe hai to 
            super(message);
            this.code=code;
            this.name="ValidationError";
            // console.log(this.message);
            // console.log(this.code);

            // Stack trace = function calls ka history, jo batata hai:
            // error kahan paida hua, aur kaun-kaun se functions ke through aaya
            Error.captureStackTrace(this,this.constructor)
        }
    }

    const err1=new validationError("Not valid Syntax",404);

    // ye Sabhi Error jayega Global handler ke pass wo response me show karega formate karke deside karega kya show karna hai 
    console.log(err1.name);
    console.log(err1.code);
    console.log(err1.message);
*/