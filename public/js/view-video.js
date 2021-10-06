const id = document.querySelector('#video_id').value
const btnLike = document.querySelector('#btnLike')
const btnDisLike = document.querySelector('#btnDislike')
const likes = document.querySelector('#divLikes')
const disLikes = document.querySelector('#divDislikes')

btnLike.addEventListener('click', (e) => {
    e.preventDefault()
    updateLikes('like')
})

btnDisLike.addEventListener('click', (e) => {
    e.preventDefault()
    updateLikes('dislike')
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
    })
}