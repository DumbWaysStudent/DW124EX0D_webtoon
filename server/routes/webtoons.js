const express = require('express')
require('express-group-routes')

// const app = require('express-promise-router')()
const app = express()

const WebtoonController = require('../controllers/WebtoonController')

const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/multer')

app.group('/api/v1' , router => {
    router.get("/webtoons", WebtoonController.index)

    router.post("/user/:userId/webtoon",authentication,upload.single('coverImage'),WebtoonController.store)
    
    // router.get("/webtoons/:userId", authentication, WebtoonController.showUserWebtoon)

    router.delete("/user/:userId/webtoon/:webtoonId", authentication, WebtoonController.remove)
})
    


module.exports = app

