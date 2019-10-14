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
    isFavorite : {
        type : Boolean
    },
    createdAt : {
        type : String
    },
    updatedAt : {
        type : String
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    coverImage : {
        type : String
    }
})

module.exports = mongoose.model('Webtoon', WebtoonSchema)
