const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
});

const uploadFiles = async (file, typeFile, path) => {
    let response = ''
    await cloudinary.uploader.upload(`public/upload/${file.filename}`,
        {
            resource_type: typeFile,
            public_id: `${path}${file.filename}`,
            overwrite: true
        },
        function (error, result) {
            fs.unlinkSync('./' + file.path)

            if (error) {
                return response = error
            }
            response = result
        });

    return response
}

module.exports = {
    uploadFiles
}