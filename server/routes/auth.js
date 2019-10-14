'use strict'

require('express-group-routes')
const app = require('express-promise-router')()

const AuthController = require('../controllers/AuthController')


app.group('/api/v1', router => {
    router.post('/login', AuthController.authUser)
})

module.exports = app