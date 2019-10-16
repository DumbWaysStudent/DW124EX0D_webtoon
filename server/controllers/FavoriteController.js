const _ = require('lodash')
const Favorite = require('../models/Favorite')

module.exports = {
    show : async (req, res, next) => {
        try {
            const {userId} = req.params
            const result = await Favorite.find({userId}).populate('webtoonId')
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
                const newFavorite = new Favorite(_.pick(req.body , [
                    'webtoonId'
                ]))
                newFavorite.userId = userId
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
            await Favorite.findByIdAndDelete(favoriteId)
            res.status(203).send("Berhasil dihapus")
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
        
    }
}