const express = require('express')
const multer = require('multer')
const moment = require('moment')
const router = express.Router()
const Video = require('../models/video')
const { convertDate } = require('../utils/helpers')
const { uploadFiles } = require('../utils/upload-cloudinary')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        if (file.fieldname === 'cover-photo') {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Please upload a image'));
            }
        }

        if (file.fieldname == 'video') {
            if (!file.originalname.match(/\.(mp4)$/)) {
                return cb(new Error('Please upload a video'));
            }
        }

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    },
})

const upload = multer({ storage })

// Redirect to home page
router.get('', (req, res) => {
    res.redirect('/videos')
})

router.get('/videos/search', (req, res) => {
    res.redirect('/videos')
})

// Home page
router.get('/videos', async (req, res) => {
    const { sortBy } = req.query

    try {
        const videosDB = await Video.find().sort({ createdAt: sortBy == 'desc' ? -1 : 1 }).exec()
        const videos = convertDate(videosDB, 'createdAt', 'convertDate')

        res.render('index', {
            videos
        })
    } catch (error) {
        res.status(500).send()
    }
})

// Page for upload videos
router.get('/videos/upload', (req, res) => {
    res.render('upload-video')
})

// View detail video
router.get('/videos/:id', async (req, res) => {
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
})

// Save video upload
router.post('/videos', upload.fields([{ name: 'cover-photo', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
    let video = new Video(req.body)
    try {
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
        await video.save()

        res.redirect('/videos')
    } catch (error) {
        res.status(500).send()
    }
})

// Search videos
router.post('/videos/search', async (req, res) => {
    const { search } = req.body

    const videosDB = await Video.find().or([{ title: { $regex: '.*' + search + '.*', $options: 'i' } }, { tags: { $regex: '.*' + search + '.*', $options: 'i' } }])
    const videos = convertDate(videosDB, 'createdAt', 'convertDate')

    res.render('index', {
        videos
    })
})

//Update likes or dislikes
router.patch('/videos/:id', async (req, res) => {
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
})

// Add comments
router.put('/videos/addComment/:id', async (req, res) => {
    const id = req.params.id
    const { txtComment } = req.body

    try {
        const video = await Video.saveComments(id, txtComment)
        const videos = convertDate(video.comments, 'createdAt', 'convertDate')

        res.send(videos)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router