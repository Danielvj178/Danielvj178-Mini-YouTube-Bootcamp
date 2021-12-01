const mongoose = require('mongoose');
const urlConnection = process.env.MONGODB_URL;

const dbConnection = async () => {
    try {
        await mongoose.connect(urlConnection);
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('The connection with DB is wrong!');
    }
}

module.exports = {
    dbConnection
}

