const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const { dbConnection } = require('../db/mongoose');


class Server {
    constructor() {
        this.app = express();
        this.hbs = hbs;
        this.port = process.env.PORT;
        this.paths = {
            'public-directory': path.join(__dirname, '../public'),
            'views-path': path.join(__dirname, '../public/views'),
            'partials-path': path.join(__dirname, '../public/partials'),
            videos: '/videos/',
            home: '/'
        };
        this.DBconnection();

        this.middlewares();

        this.routes();
    }

    async DBconnection() {
        await dbConnection();
    }

    middlewares() {
        this.app.set('view engine', 'hbs');
        this.app.set('views', this.paths['views-path']);
        this.hbs.registerPartials(this.paths['partials-path']);

        this.app.use(express.urlencoded({
            extended: true
        }));

        this.app.use(express.json());
        this.app.use(express.static(this.paths['public-directory']));
    }

    routes() {
        this.app.use(this.paths.home, require('../routes/home'));
        this.app.use(this.paths.videos, require('../routes/videos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application up on port ${this.port}`);
        });
    }
}

module.exports = Server;