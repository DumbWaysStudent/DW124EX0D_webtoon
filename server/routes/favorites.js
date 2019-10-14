'use strict'

require('express-group-routes')
const app = require('express-promise-router')()

const FavoriteController = require('../controllers/FavoriteController')
const authentication = require('../middlewares/authentication')

app.group('/api/v1', router => {
    router.post('/user/:userId/favorite', authentication,FavoriteController.store)
    router.get('/user/:userId/favorites',authentication, FavoriteController.show)
    router.delete('/user/:userId/favorite/:favoriteId',authentication, FavoriteController.remove)

})

module.exports = app