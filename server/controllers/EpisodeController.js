const _ = require('lodash')

const Episode = require('../models/Episode')
const Image = require('../models/Image')
const Webtoon = require('../models/Webtoon')

module.exports = {
    index : async ( req, res ,next) => {
        try {
            const {webtoonId} = req.params
            const episodes = await Episode.find({webtoonId})
            if(episodes) {
                res.status(200).send(episodes)
            }
            else {
                res.status(200).send("No data found")
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).send("Error get episode data")
        }
    },



    store : async (req, res, next) => {
        try {
            const {webtoonId} = req.params
            const webtoon = await Webtoon.findById(webtoonId)
            const newEpisode = new Episode(_.pick(req.body, [
                'title',
            ]))     
            newEpisode.webtoonId = webtoonId
            const path = require('path')
            const remove = path.join(__dirname ,'..', 'public')
            const thumbnail = req.files[0].path.replace(remove , '')
            newEpisode.thumbnail = thumbnail
            await newEpisode.save()
            webtoon.episodes += 1
            await webtoon.save()
            req.files.map(item => {
                const newImage = new Image()
                let relPath = item.path.replace(remove, '')
                newImage.uri = relPath
                newImage.episodeId = newEpisode._id
                newImage.save()
            })
            
            res.send(newEpisode)
        }
        catch (err){
            console.log(err)
            res.status(400).send('Error adding episodes')
        }
    },
    
    show : async(req, res, next) => {
        try {
            const {episodeId} = req.params
            const episode = await Episode.findById(episodeId)
            // const image = await Image.find({episodeId})
            if(episode) {
                res.status(200).send(episode)
            }
            else {
                res.status(200).send("No data found")
            }
        }
        catch(err) {
            console.log(err)
            res.status(400).send("Error showing episode data")
        }
    },
    remove : async(req, res, next) => {
        try {
            const {episodeId, webtoonId} = req.params
            const webtoon = await Webtoon.findById(webtoonId)
            webtoon.episodes -= 1
            await Episode.findByIdAndDelete(episodeId)
            await webtoon.save()
            res.status(204).send("Successfully delete episode")
        }
        catch(err) {
            console.log(err)
            res.status(400).send("Error removing data")
        }
    },

    update : async(req, res, next) => {
        try {
            const {episodeId} = req.params
                req.files.map(item => {
                    const newImage = new Image()
                    const path = require('path')
                    const remove = path.join(__dirname ,'..', 'public')
                    let relPath = item.path.replace(remove, '')
                    newImage.uri = relPath
                    newImage.episodeId = episodeId
                    newImage.save()
                })
                const updatedEpisode = await Episode.findByIdAndUpdate(episodeId, 
                    {
                        title : req.body.title,
                        updatedAt : Date.now()
                    }, 
                    {new : true, useFindAndModify: false})
                res.send(updatedEpisode)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }

    },
    allImage : async ( req, res ,next) => {
        try {
            const {episodeId} = req.params
            const images = await Image.find({episodeId})
            if(images) {
                res.status(200).send(images)
            }
            else {
                res.status(200).send("No data found")
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).send("Error get episode data")
        }
    },

    imageRemove : async(req, res, next) => {
        try {
            const {imageId} = req.params
            await Image.findByIdAndDelete(imageId)
            res.status(204).send("Successfully delete Image")
        }
        catch(err) {
            console.log(err)
            res.status(400).send("Error removing data")
        }
    }

}
