module.exports = (err, req, res, next) => {
    console.log("Application Error ->", err);
    next();
};
