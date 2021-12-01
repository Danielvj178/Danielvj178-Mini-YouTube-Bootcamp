const moment = require('moment');

const Video = require('../models/video');
const { convertDate } = require('../utils/helpers');
const { uploadFiles } = require('../utils/upload-cloudinary');

const addComments = async (req, res) => {
    const id = req.params.id
    const { txtComment } = req.body

    try {
        const video = await Video.saveComments(id, txtComment)
        const videos = convertDate(video.comments, 'createdAt', 'convertDate')

        res.send(videos)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getVideos = async (req, res) => {
    const { sortBy } = req.query

    try {
        const videosDB = await Video.find().sort({ createdAt: sortBy == 'desc' ? -1 : 1 }).exec()
        const videos = convertDate(videosDB, 'createdAt', 'convertDate')

        res.render('index', {
            videos
        })
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
}

const getVideoById = async (req, res) => {
    const _id = req.params.id

    try {
        const video = await Video.findById(_id)

        if (!video) {
            return res.render('page-not-found', {
                message: 'This video is not available now'
            })

        }
        const dateVideo = moment(video.createdAt).format('MMM Do YY, h:mm a')
        const comments = convertDate(video.comments, 'createdAt', 'convertDate')
        res.render('view-video', {
            video,
            dateVideo,
            comments
        })
    } catch (error) {
        res.status(500).send()
    }
}

const postVideo = async (req, res) => {
    let video = new Video(req.body)
    try {
        if (req.files) {
            if (Object.keys(req.files).length > 0) {
                if (Object.keys(req.files).includes('cover-photo')) {
                    let response = await uploadFiles(req.files['cover-photo'][0], 'image', 'mini_youtube_bootcamp/images/')

                    if (response.http_code === 400) {
                        return res.render('page-not-found')
                    }
                    video.url_image = response.secure_url
                }
                let response = await uploadFiles(req.files['video'][0], 'video', 'mini_youtube_bootcamp/videos/')

                if (response.http_code === 400) {
                    return res.render('page-not-found')
                }
                video.url_video = response.secure_url
            }
        }
        await video.save()

        res.redirect('/videos')
    } catch (error) {
        res.status(500).send()
    }
}

const redirectSearch = (req, res) => {
    res.redirect('/videos');
}

const searchVideos = async (req, res) => {
    const { search } = req.body

    const videosDB = await Video.find().or([{ title: { $regex: '.*' + search + '.*', $options: 'i' } }, { tags: { $regex: '.*' + search + '.*', $options: 'i' } }])
    const videos = convertDate(videosDB, 'createdAt', 'convertDate')

    res.render('index', {
        videos
    });
}

const updateLikes = async (req, res) => {
    const _id = req.params.id
    const { type } = req.body

    try {
        const video = await Video.findById(_id)

        switch (type) {
            case 'like':
                video.likes += 1
                break
            case 'dislike':
                video.dislikes += 1
                break
            default:
                let message = 'Parameter type is wrong'
                return res.status(404).send(message)
        }
        await video.save()

        res.send(video)
    } catch (error) {
        res.status(500).send(error)
    }
}

const uploadVideo = (req, res) => {
    res.render('upload-video');
}

module.exports = {
    addComments,
    getVideos,
    getVideoById,
    postVideo,
    redirectSearch,
    searchVideos,
    updateLikes,
    uploadVideo
}