const mongoose = require("mongoose");
const colors = require("colors");

/**
 * Asynchronously connects to the MongoDB database using the connection URL and database name
 * specified in the environment variables.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 * @throws Will log an error message if the connection fails.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, { dbName: process.env.DB_NAME });
        console.log(`Connected to MongoDb Database`.green + ` ${mongoose.connection.host}`.magenta.bold);
    } catch (error) {
        console.log(`Mongodb Error ${error}`.red);
    }
}

module.exports = connectDB;