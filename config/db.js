const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { DB_NAME: process.env.DB_NAME });
        console.log(`Connected to MongoDb Database ${mongoose.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`Mongodb Error ${error}`.bgRed.white);
    }
}

module.exports = connectDB;