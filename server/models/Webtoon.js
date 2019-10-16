const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WebtoonSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    genre : {
        type : String,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    coverImage : {
        type : String
    },
    episodes : {
        type : Number
    },
    favoriteBy : {
        type : Number
    }
})

module.exports = mongoose.model('Webtoon', WebtoonSchema)
