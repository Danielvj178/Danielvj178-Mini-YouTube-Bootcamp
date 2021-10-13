const form = document.querySelector('form')
const title = document.querySelector('#title')
const tags = document.querySelector('#tag')
const image = document.querySelector('#upload-image')

form.addEventListener('submit', (e) => {
    if (!fileValidation('upload-video')) {
        e.preventDefault()
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid file type for the video'
        })
    }

    if (image.value.trim() !== '') {
        if (!fileValidation('upload-image')) {
            e.preventDefault()
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid file type for the image'
            })
        }
    }

    if (title.value.trim() === '') {
        e.preventDefault()
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Title is required!'
        })
    }
    if (tags.value.trim() === '') {
        e.preventDefault()
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tags is required!'
        })
    }
})

function fileValidation(type) {
    const fileInput = (type == 'upload-video') ? document.getElementById('upload-video') : document.getElementById('upload-image')
    const filePath = fileInput.value
    const allowedExtensions = (type == 'upload-video') ? /(\.mp4)$/i : /(\.jpg|\.jpeg|\.png|\.gif)$/i

    if (!allowedExtensions.exec(filePath)) {
        return false
    }
    return true
}