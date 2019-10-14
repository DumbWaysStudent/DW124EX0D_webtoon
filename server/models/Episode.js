const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EpisodeSchema = new Schema ({
    title : {
        type : String,
        required : true
    },
    imagesContent : [{
        type : String,
    }],
    createdAt : {
        type : String,
    },
    webtoonId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    updatedAt : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Episode', EpisodeSchema)
