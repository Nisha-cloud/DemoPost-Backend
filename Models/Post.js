const mongoose = require('mongoose')

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


const Post = mongoose.model('Post', postSchema)




module.exports = Post


