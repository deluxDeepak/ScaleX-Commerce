// Test route here only ======================


// Test Load backend 
const router = require("express").Router();
const os = require("os");
const logger = require("../core/logger/logger");

// Cpu blocking test (Cpu block ho jayega )
// router.get("/heavy", async (req, res) => {
//     let sum = 0;
//     for (let i = 0; i < 1e7; i++) {
//         sum += i;
//     }

//     res.json({
//         pid: process.pid,
//         sum,
//         message:`Response from ${os.hostname()}`
//     })
// })

router.get("/heavy", async (req, res) => {
    console.log("Handled by:", process.env.HOSTNAME);

    res.json({
        pid: process.pid,
        message: `Response from ${os.hostname()}`
    });
});

// Test--sentry setup===============
router.get("/debug-sentry", (req) => {
    console.log("Sentry error with req headers", req.headers);
    throw new Error("My first Sentry error!");
});

// Testing headers comming from nginx ==
router.get("/test-headers", (req, res) => {

    logger.info(
        {
            headers: req.headers,
            user: req.user,
            cookies: req.cookies,
            authorization: req.headers.authorization,
            cookieHeader: req.headers.cookie,
        },
        "Response from headers are:"
    );

    res.status(200).json({
        host:req.host,
        headers: req.headers,
        user: req.user,
        cookies: req.cookies,
        authorization: req.headers.authorization,
        cookieHeader: req.headers.cookie,
    });
})


module.exports = router