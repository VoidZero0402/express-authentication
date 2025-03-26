const app = require('./app')
const configs = require("./configs");
const { connectToDatabase } = require("./database");

const serve = async () => {
    try {
        await connectToDatabase();
        app.listen(configs.port, () => {
            console.log(`Server Connected On Port ${configs.port}`);
        });
    } catch (err) {
        console.log("Server Running Error ->", err);
        process.exit(1);
    }
};

serve();
