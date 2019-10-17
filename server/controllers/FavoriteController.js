const _ = require('lodash')
const Favorite = require('../models/Favorite')
const Webtoon = require('../models/Webtoon')

module.exports = {
    show : async (req, res, next) => {
        try {
            const {userId} = req.params
            const result = await Favorite.find({userId}).populate({ 
                path: 'webtoonId',
                populate: {
                  path: 'createdBy',
                  model: 'User'
                } 
             })
            res.status(200).send(result)
        }   
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    store : async(req, res, next) => {
        try {
            const {userId} = req.params
            const existedFavorite = await Favorite.find({webtoonId : req.body.webtoonId, userId})
            if(existedFavorite.length >0) {
                res.status(200).send("Item has existed in favorite")
            }
            else {
                const webtoon = await Webtoon.findById(req.body.webtoonId)
                const newFavorite = new Favorite(_.pick(req.body , [
                    'webtoonId'
                ]))
                newFavorite.userId = userId
                webtoon.favoriteBy += 1
                await webtoon.save()
                await newFavorite.save()
                res.status(201).send("Berhasil ditambahkan")
            }
            
        }catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },

    remove : async (req, res,next) => {
        try {
            const {favoriteId} = req.params
            const favorite = await Favorite.findById(favoriteId)
            const webtoon = await Webtoon.findById(favorite.webtoonId)
            webtoon.favoriteBy -= 1
            await webtoon.save()
            await Favorite.findByIdAndDelete(favoriteId)
            res.status(203).send("Berhasil dihapus")
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}