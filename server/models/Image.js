const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema ({
    uri : {
        type : String
    },
    episodeId : {
        type : Schema.Types.ObjectId,
        required : true
    }
})

module.exports = mongoose.model("Image", ImageSchema)