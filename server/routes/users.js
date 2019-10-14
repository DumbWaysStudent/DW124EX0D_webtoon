'use strict'
require('express-group-routes')
const app = require('express-promise-router')()
const UserController = require('../controllers/UserController')

const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/multer')


app.group('/api/v1', router => {
    router.get("/users", UserController.index)

    router.post("/register", UserController.newUser)   
    
    router.get("/user",authentication, UserController.getUser)
    router.put("/user", authentication, upload.single("profilepicture"), UserController.editUser)
}) 


module.exports = app
