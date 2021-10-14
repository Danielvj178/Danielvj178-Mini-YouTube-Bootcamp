const request = require('supertest')
const app = require('../src/app')


test('should get a videos', async () => {
    await request(app).get('/videos').expect(200)
})

test('should post a video', async () => {
    await request(app).post('/videos')
        .send({
            title: 'Test Video',
            tags: 'Video Test',
            url_video: './tests/fixtures/video_prueba.mp4'
        }).expect(302)

})

test('should post a video without url_video', async () => {
    await request(app).post('/videos')
        .send({
            title: 'Test Video',
            tags: 'Video Test'
        }).expect(500)
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
