const AuthError = require("./AuthError");
const DatabaseError = require("./DatabaseError");
const FiletypeError = require("./FiletypeError");
const NotfoundError = require("./NotfoundError");
const ValidationError = require("./ValidationError");
const PaymentError = require("./PaymentError");

module.exports = {
    ValidationError,
    FiletypeError,
    DatabaseError,
    AuthError,
    NotfoundError,
    PaymentError,

}
