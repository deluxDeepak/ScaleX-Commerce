const appRoute = require("../routes/app.route");
const loadRoute = (app) => {
    app.use("/api", appRoute);

}
module.exports = loadRoute;