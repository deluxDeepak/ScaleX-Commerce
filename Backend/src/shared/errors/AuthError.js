const AppError = require("./AppError");

class AuthError extends AppError{
    constructor(message="Authentication Error"){
        super(message,401)
        this.name="AuthenticationError"
    }
}
module.exports=AuthError