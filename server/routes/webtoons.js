require('express-group-routes')

const app = require('express-promise-router')()

const WebtoonController = require('../controllers/WebtoonController')

const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/multer')

app.group('/api/v1' , router => {
    router.get("/webtoons", WebtoonController.index)
    router.get("/webtoons/:input", WebtoonController.filteredShow)

    router.get("/user/:userId/webtoons",authentication, WebtoonController.showUserWebtoon)
    router.post("/user/:userId/webtoon",authentication,upload.single('coverImage'),WebtoonController.store)

    router.delete("/user/:userId/webtoon/:webtoonId", authentication, WebtoonController.remove)
})
    


module.exports = app

