require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Database config
require('./Config/Database')

// HTTP Web server
const app = express()
app.use(express.json())
app.use(cors())

// Import all routes
require('./routes/routes')(app)

// Running server
app.listen(process.env.SERV_PORT, ()=> console.log(`Server running on port: http://localhost:${process.env.SERV_PORT}`))