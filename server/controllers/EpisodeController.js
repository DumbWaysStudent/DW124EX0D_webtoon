const _ = require('lodash')

const Episode = require('../models/Episode')

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
            req.files.map(item => {
                const path = require('path')
                const remove = path.join(__dirname ,'..', 'public')
                let relPath = item.path.replace(remove, '')
                newEpisode.imagesContent.push(relPath) 
            })
            await newEpisode.save()
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
    }
}
