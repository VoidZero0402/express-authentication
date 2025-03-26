const UserModel = require("../models/User");
const { verifyAccessToken } = require("../utils/auth");

module.exports = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;   
    
    console.log(req.cookies);
    

    if (!accessToken) {
        return res.status(401).json({ message: "User in unauthorized!" });
    }

    const payload = verifyAccessToken(accessToken);

    if (!payload) {
        return res.status(401).json({ message: "User in unauthorized!" });
    }

    const user = await UserModel.findOne({ _id: payload._id }, "-password");

    req.user = user;

    next();
};
