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
    const divComments = document.getElementById('divComments')

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
            let comment = data.at(-1)
            divComments.insertAdjacentHTML('beforeend', `<div class="card"><h5 class= "card-header alert-danger"> Generic User - ${comment.convertDate}</h5><div class="card-body"><p class="card-text">${comment.comment}</p></div></div><br/>`)
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