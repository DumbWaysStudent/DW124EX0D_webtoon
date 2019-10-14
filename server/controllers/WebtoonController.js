const _ = require('lodash');

const User = require('../models/User')
const Webtoon = require('../models/Webtoon')

module.exports = {
    index : async(req, res, next) => {
        try {
            const allWebtoon = await Webtoon.find({})
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
            const userWebtoon =await  Webtoon.find({createdBy : userId})
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
            newWebtoon.createdBy = userId
            newWebtoon.createdAt = Date().slice(4, 24).toString()
            newWebtoon.updatedAt = Date().slice(4, 24).toString()
            await newWebtoon.save()
            res.status(201).send(newWebtoon)
        }
        else {
            res.status(400).send(err)
        }
    },
    
    filteredShow : async (req, res, next) => {
        const {input} = req.params
        try {
            const result = await Webtoon.find({title : input})
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
                console.log(req.body)
                const webtoon = await Webtoon.findByIdAndUpdate(webtoonId, 
                    {
                    title : req.body.title, 
                    updatedAt :Date().slice(4, 24).toString(), 
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
