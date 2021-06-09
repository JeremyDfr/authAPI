module.exports = (app) => {
    const AuthController = require('../Controllers/AuthController')
    const CheckToken = require('../Middlewares/CheckToken')

    // Register a user
    app.post('/register', AuthController.register);

    // Login a user
    app.post('/login', AuthController.login);

    // Private route
    app.get('/private', CheckToken, (req, res, next) => {
        res.send('Access Granted')
    })
}