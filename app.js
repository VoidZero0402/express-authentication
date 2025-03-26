const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const configs = require("./configs");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

const authRouter = require("./routes/auth");

const app = express();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(configs.cookies.secret));

app.use("/api/auth", authRouter);

app.use(globalErrorHandler);

module.exports = app;
