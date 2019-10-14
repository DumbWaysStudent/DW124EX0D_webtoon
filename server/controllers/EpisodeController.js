const _ = require('lodash')

const Episode = require('../models/Episode')
const Image = require('../models/Image')


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
            const newEpisode = new Episode(_.pick(req.body, [
                'title',
            ]))     
            newEpisode.webtoonId = webtoonId
            newEpisode.createdAt = Date().slice(4, 24).toString()
            newEpisode.updatedAt = Date().slice(4, 24).toString()
            await newEpisode.save()
            
            req.files.map(item => {
                const newImage = new Image()
                const path = require('path')
                const remove = path.join(__dirname ,'..', 'public')
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
            const image = await Image.find({episodeId})
            if(episode) {
                res.status(200).send({episode, image})
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
            const {episodeId} = req.params
            await Episode.findByIdAndDelete(episodeId)
            res.send(204).send("Successfully delete episode")
        }
        catch(err) {
            console.log(err)
            res.status(400).send("Error removing data")
        }
    }
}
