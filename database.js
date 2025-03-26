const mongoose = require("mongoose");
const configs = require("./configs");

module.exports.connectToDatabase = async () => {
    try {
        await mongoose.connect(configs.database.uri);
        console.log(`MongoDB connected successfully: ${mongoose.connection.host}`);
    } catch (err) {
        console.error("Error in database connection ->", err);
        process.exit(1);
    }
};
