const _ = require('lodash');

const User = require('../models/User')
const Webtoon = require('../models/Webtoon')

module.exports = {
    index : async(req, res, next) => {
        try {
            const allWebtoon = await Webtoon.find({}).populate('createdBy')
                res.status(200).send(allWebtoon)
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    showUserWebtoon : async(req, res, next) => {
        const {userId} = req.params
        try {
            const userWebtoon =await Webtoon.find({createdBy : userId})
            if(userWebtoon){
                res.status(200).send(userWebtoon)
            }else {
                res.status(200).send("Data not found")
            }
        }catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    },

    store : async(req, res, next) => {
        const user = await User.findById(req.userId)
        if(user) {
            const userId = req.params.userId
            const newWebtoon = new Webtoon(_.pick(req.body , [
                'title',
                'genre',
            ]))
            const path = require('path')
            const remove = path.join(__dirname , '..', 'public')
            const relPath = req.file.path.replace(remove, '')
            newWebtoon.coverImage = relPath
            newWebtoon.episodes = 0
            newWebtoon.favoriteBy = 0
            newWebtoon.createdBy = userId
            await newWebtoon.save()
            res.status(201).send(newWebtoon)
        }
        else {
            res.status(400).send(err)
        }
    },
    sortByDate : async(req, res, next) => {
        await Webtoon.find({}).populate('createdBy').sort({"createdAt":-1}).exec(function(err, doc) {
             res.send(doc)
         })
    },
    filteredShow : async (req, res, next) => {
        const {input} = req.params
        try {
            const userRegex = new RegExp(input, 'i')
            const result = await Webtoon.find({title : userRegex})
            res.status(200).send(result)
        }catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    remove : async (req, res, next) => {
        try {
            const {webtoonId, userId} = req.params
            await Webtoon.findByIdAndDelete(webtoonId)
            res.status(204).send("Webtoon successfully deleted")
        }
        catch (err){
            console.log(err)
            res.status(400).send(err)
        }
    },

    update : async (req, res, next) => {
        try {
                const {webtoonId} = req.params
                const webtoon = await Webtoon.findByIdAndUpdate(webtoonId, 
                    {
                    title : req.body.title, 
                    updatedAt :Date.now(), 
                    genre : req.body.genre }, 
                    {new : true}
                    )
                res.status(202).send(webtoon)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }        
    }
}
