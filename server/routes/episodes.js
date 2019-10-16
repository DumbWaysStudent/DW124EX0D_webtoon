'use strict'
require('express-group-routes')
const app = require('express-promise-router')()
const EpisodeController = require('../controllers/EpisodeController')

const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/multer')


app.group('/api/v1', router => {
    router.get("/webtoon/:webtoonId/episode/:episodeId", EpisodeController.show)
    
    router.get("/webtoon/:webtoonId/episodes", EpisodeController.index )
    
    router.post("/user/:userId/webtoon/:webtoonId/episode", authentication, upload.array("contentImage", 15), EpisodeController.store)
    
    router.delete("/user/:userId/webtoon/:webtoonId/episode/:episodeId", authentication,EpisodeController.remove)
    router.put("/user/:userId/webtoon/:webtoonId/episode/:episodeId",upload.array("contentImage", 15), authentication,EpisodeController.update)
    
    router.get("/webtoon/:webtoonId/episode/:episodeId/images",EpisodeController.allImage)
    router.delete("/user/:userId/webtoon/:webtoonId/episode/:episodeId/image/:imageId", authentication,EpisodeController.imageRemove)
}) 


module.exports = app

