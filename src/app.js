const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const videoRouter = require('./routers/video')

const app = express()

// Config public directory
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/views')
const partialsPath = path.join(__dirname, '../public/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(videoRouter)
app.use(express.static(publicDirectory))

app.use((req, res) => {
    res.render('page-not-found')
})

module.exports = app