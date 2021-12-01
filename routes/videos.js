const { Router } = require('express');
const router = Router();
const { upload } = require('../utils/upload-image-multer');
const { addComments, getVideos, getVideoById, postVideo, updateLikes, searchVideos, redirectSearch, uploadVideo } = require('../controllers');

// Page for upload videos
router.get('/upload', uploadVideo);

// Redirect to homepage after search
router.get('/search', redirectSearch);

// Home page
router.get('/', getVideos);

// View detail video
router.get('/:id', getVideoById);

// Save video upload
router.post('/', [
    upload.fields([{ name: 'cover-photo', maxCount: 1 }, { name: 'video', maxCount: 1 }])
], postVideo);

// Search videos
router.post('/search', searchVideos);

//Update likes or dislikes
router.patch('/:id', updateLikes)

// Add comments
router.put('/addComment/:id', addComments);

module.exports = router;