const videos = require('./videos');
const home = require('./home');

module.exports = {
    ...home,
    ...videos
}