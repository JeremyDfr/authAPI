module.exports = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')

    const jwt = require('jsonwebtoken')

    try {
        req.user = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}