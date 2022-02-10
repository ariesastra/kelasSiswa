if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route
const route = require('./routes')
app.use('/api', route)

// Error Handler
const errorHandler = require('./middleware/ErrorHandler')
app.use(errorHandler)

module.exports = app