module.exports = (req, res, next) => {
    res.status(404).json({
        sucess: false,
        message: `Route not found ${req.originalUrl}`
    });
}