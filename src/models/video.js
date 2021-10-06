const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    url_video: {
        type: String,
        required: true
    },
    url_image: {
        type: String
    }
}, {
    timestamps: true
}
)

const video = mongoose.model('Video', videoSchema)

module.exports = video