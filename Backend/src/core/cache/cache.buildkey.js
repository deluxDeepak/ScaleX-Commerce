
const buildkey = (req, prefix) => {
    return `${prefix}:${req.originalUrl}`
}

module.exports = buildkey