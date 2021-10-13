const request = require('supertest')
const app = require('../src/app')


test('should get a videos', async () => {
    await request(app).get('/videos').expect(200)
    //console.log(response)
})

test('should post a video', async () => {
    /*  const response = await request(app).post('/videos')
         .field('title', 'New video')
         .field('description', 'Desc video')
         .field('tags', 'video new')
         .attach('video', 'tests/fixtures/video_prueba.mp4')
         .attach('cover-image', 'tests/fixtures/Imagen_prueba.jpg')
         .expect(200) */
    /* const response = await request(app).post('/videos')
        .field('title', 'New video')
        .send({
            title: 'New video',
            description: 'Desc video',
            tags: 'video new',
            url_video: 'tests/fixtures/video_prueba.mp4',
            url_image: 'tests/fixtures/Imagen_prueba.jpg'
        })
        .expect(200) */
})

test('should find the video', async () => {
    let id = '615cfe4f5fc262304a28d3e5'
    const video = await request(app).get(`/videos/${id}`).expect(200)

    expect(video).not.toBeNull()
})

test('should not find the video', async () => {
    let id = '615cfe4f5fc262304a28d3e'
    const video = await request(app).get(`/videos/${id}`).expect(500)
})

test('should find the video and set like a video', async () => {
    let id = '615cfe4f5fc262304a28d3e5'
    const video = await request(app).patch(`/videos/${id}`).send({
        type: 'like'
    }).expect(200)

    expect(video).not.toBeNull()
})

test('should wrong send parameter type to set like a video', async () => {
    let id = '615cfe4f5fc262304a28d3e5'
    await request(app).patch(`/videos/${id}`).send({
        type: 'other'
    }).expect(404)
})
