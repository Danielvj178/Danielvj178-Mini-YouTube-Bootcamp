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
    },
    comments: [{
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }]
}, {
    timestamps: true
}
)

videoSchema.statics.saveComments = async function (id, comment) {
    const video = await Video.findById(id)
    video.comments = video.comments.concat({ comment })
    await video.save()

    return video
}

const Video = mongoose.model('Video', videoSchema)

module.exports = Video