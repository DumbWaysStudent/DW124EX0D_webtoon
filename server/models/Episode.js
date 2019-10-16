const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EpisodeSchema = new Schema ({
    title : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    webtoonId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    updatedAt : {
        type : Date,
        default : Date.now
    },
    thumbnail : {
        type : String
    }
})

module.exports = mongoose.model('Episode', EpisodeSchema)
