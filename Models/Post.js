const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true

        },
        desc: {
            type: String,
            required: true
        },
        images: 
             [String],
            // required: true()
        
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Post", postSchema)

