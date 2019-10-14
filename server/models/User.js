const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    profilepicture : {
        type : String
    },
    // userFavourite : [{
    //     type : Schema.ObjectId,
    //     ref : 'Webtoon'
    // }],
    userWebtoon : [{
        type : Schema.Types.ObjectId,
        ref : 'Webtoon'
    }]
})

 
module.exports = mongoose.model('User', UserSchema)