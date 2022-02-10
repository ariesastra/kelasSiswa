const route = require('express').Router()
const user = require('./UserRoute')
const classRouter = require('./ClassRoute')

// Test Route
route.get('/', (req, res) => {
  res.status(200).json({
    messaage: 'API Running'
  })
})

route.use('/user', user)
route.use('/class', classRouter)

module.exports = route