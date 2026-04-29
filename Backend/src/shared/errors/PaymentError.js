const AppError = require("./AppError");

class PaymentError extends AppError {
    constructor(message = "Payment processing failed", statusCode = 502, details = {}) {
        super(message, statusCode);
        this.name = "PaymentError";
        this.details = details;
    }
}

module.exports = PaymentError;
