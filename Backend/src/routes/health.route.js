const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is OK",
        uptime: process.uptime(),
        timestamp: new Date().toLocaleString()

    })

});

module.exports = router;