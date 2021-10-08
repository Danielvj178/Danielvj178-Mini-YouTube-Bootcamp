// Likes or dislikes
const id = document.querySelector('#video-id').value
const btnLike = document.querySelector('#btnLike')
const btnDisLike = document.querySelector('#btnDislike')
const likes = document.querySelector('#divLikes')
const disLikes = document.querySelector('#divDislikes')

// Add comment to video
const btnComment = document.querySelector('#btn-comment')
const txtComment = document.querySelector('#txtComment')

btnLike.addEventListener('click', (e) => {
    e.preventDefault()
    updateLikes('like')
})

btnDisLike.addEventListener('click', (e) => {
    e.preventDefault()
    updateLikes('dislike')
})

btnComment.addEventListener('click', (e) => {
    e.preventDefault()
    const url = `/videos/addComment/${id}`

    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            txtComment: txtComment.value
        })
    }).then(response => {
        txtComment.value = ''
        response.json().then(data => {
            console.log(data)
        })
    }).catch(error => {
        console.log(error)
    })
})

const updateLikes = type => {
    const url = `/videos/${id}`

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            type
        })
    }).then((response) => {
        response.json().then((data) => {
            switch (type) {
                case 'like':
                    likes.textContent = data.likes
                    break
                case 'dislike':
                    disLikes.textContent = data.dislikes
                    break
                default:
                    break
            }
        })
    }).catch(error => {
        console.log(error)
    })
}