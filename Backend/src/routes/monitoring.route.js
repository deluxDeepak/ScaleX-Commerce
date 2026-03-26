const { client } = require("../core/monitoring/prometheus");


const router = require("express").Router();


router.get("/metrics", async (req, res) => {
    // 1.set header 
    res.setHeader('Content-Type', client.register.contentType);
    // 2.register content 
    const metrics = await client.register.metrics();
    // 3.send metrics
    res.send(metrics);
});

module.exports=router;

