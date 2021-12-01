const multer = require('multer');

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
});

const upload = multer({ storage });

module.exports = {
    upload
}