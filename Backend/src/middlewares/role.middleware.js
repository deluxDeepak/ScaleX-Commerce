const AuthError = require("../shared/errors/AuthError");

// checkRole("admin")
// checkRole("seller")
// checkRole("seller","admin")
const checkRole = (role) => {
    return (req, res, next) => {
        console.log("role", role);
        if (!req.user) {
            throw new AuthError("User not logged In ! || Logged in first");
        }
        if (!role.includes(req.user.role)) {
            throw new AuthError("You are not Authorize || Forbidden");
        }
        next();
    }
}

module.exports = checkRole;