const AuthError = require("./AuthError");
const DatabaseError = require("./DatabaseError");
const FiletypeError = require("./FiletypeError");
const NotfoundError = require("./NotfoundError");
const ValidationError = require("./ValidationError");

module.exports={
    ValidationError,
    FiletypeError,
    DatabaseError,
    AuthError,
    NotfoundError,
    
}
