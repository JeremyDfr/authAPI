module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken')

    // Check if token exist
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')

    // Check token validity
    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}