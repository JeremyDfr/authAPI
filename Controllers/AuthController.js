const Database = require('../Config/Database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Register
exports.register = async (req, res) => {
    // Verify if email already exist
    const user = await Database.User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user) return res.status(400).send('Email already exists')

    // Hash password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)

    // Create user
    await Database.User.create({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: hashedPassword,
        roleId: 1
    }).then(user => {
        res.status(200).send(user)
    }).catch(error => {
        res.status(500).send(error)
    })
};

// Login
exports.login = async (req, res) => {
    // Verify if email exist
    const user = await Database.User.findOne({
        where: {
            email: req.body.email
        }
    })
    console.log(user)
    if (!user) return res.status(400).send('Email not found')

    const checkPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!checkPassword) return res.status(400).send('Invalid password')

    // Create user token
    const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
};