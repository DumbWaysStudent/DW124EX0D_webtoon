const _ = require('lodash');

const mongoose = require('mongoose')
const User = require('../models/User')
const Webtoon = require('../models/Webtoon')
const Episode = require('../models/Episode')
module.exports = {
    index : async(req, res, next) => {
        const allWebtoon = await Webtoon.find({})
        if(allWebtoon) {
            res.status(200).send(allWebtoon)
        }else {
            res.status(400).send('Error getting Webtoon data')
        }
    },
//     showUserWebtoon : async (req, res, next) => {
//         const user = await User.findById(req.userId)
//         if(user) {
//             const {userId, } = req.params
//             const userWebtoon = await Webtoon.aggregate(
//                 [ { $match : { userId : mongoose.Types.ObjectId(userId) } } ]
//             )
// await Episode.populate(userWebtoon, {path: "episodes"})
//             res.status(200).send(userWebtoon)
//         }
//     },

    store : async(req, res, next) => {
        const user = await User.findById(req.userId)
        if(user) {
            const userId = req.params.userId
            const newWebtoon = new Webtoon(_.pick(req.body , [
                'title',
                'genre',
                'isFavorite'
            ]))
            const path = require('path')
            const remove = path.join(__dirname , '..', 'public')
            const relPath = req.file.path.replace(remove, '')
            newWebtoon.coverImage = relPath
            newWebtoon.createdBy = userId
            newWebtoon.createdAt = Date().slice(4, 24).toString()
            newWebtoon.updatedAt = Date().slice(4, 24).toString()
            await newWebtoon.save()
            res.status(201).send(newWebtoon)
        }
        else {
            res.status(400).send('Webtoon error')
        }
    },
    
    // show : async (req, res, next) => {
    //     const user = await User.findById(req.userId)
    //     if (user) {
    //         res.status(200).send(user)
    //     }
    //     else {
    //         res.status(400).send('Error showing webtoon')
    //     }
    // },

    remove : async (req, res, next) => {
        try {
            const {webtoonId, userId} = req.params
            // const userWebtoon = Webtoon.find({createdBy : userId})
            await Webtoon.findByIdAndDelete(webtoonId)
            res.status(204).send("Webtoon successfully deleted")
        }
        catch (err){
            console.log(err)
            res.status(400).send("Error remove webtoon")
        }
    },

    // update : async (req, res, next) => {
    //     const user = await User.findById(req.userId)

    // }
}
