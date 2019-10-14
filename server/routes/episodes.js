'use strict'
require('express-group-routes')
const app = require('express-promise-router')()
const EpisodeController = require('../controllers/EpisodeController')

const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/multer')


app.group('/api/v1', router => {
    // router.post("/user", UserController.newUser)
    router.get("/webtoon/:webtoonId/episode/:episodeId", EpisodeController.show)
    router.get("/webtoon/:webtoonId/episodes", EpisodeController.index )
    // router.get("/user/:userId",authentication, UserController.getUser)
    router.post("/user/:userId/webtoon/:webtoonId/episode", authentication, upload.array("contentImage", 15), EpisodeController.store)
}) 


module.exports = app

