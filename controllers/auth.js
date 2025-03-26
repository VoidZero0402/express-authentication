const UserModel = require("./../models/User");
const redis = require("./../redis");
const { compare } = require("bcryptjs");
const configs = require("../configs");
const { generateAccessToken, verifyRefreshToken, setJWTCookies, cookiesOptions } = require("./../utils/auth");

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const user = await UserModel.create({ username, email, password });

        await setJWTCookies(res, { _id: user._id, role: user.role });

        return res.json({ message: "User signed up successfully!" });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email already exist!" });
        }
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with this email!" });
        }

        const isCorrectPassword = await user.comparePassword(password);

        if (!isCorrectPassword) {
            return res.status(400).json({ message: "Invlaid email or password!" });
        }

        await setJWTCookies(res, { _id: user._id, role: user.role });

        return res.json({ message: "User loged in successfully!" });
    } catch (err) {
        next(err);
    }
};

module.exports.getMe = async (req, res, next) => {
    try {
        return res.json(req.user);
    } catch (err) {
        next(err);
    }
};

module.exports.refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "User is unauthorized!" });
        }

        const payload = verifyRefreshToken(refreshToken);

        if (!payload) {
            return res.status(401).json({ message: "User is unauthorized!" });
        }

        const cachedRefreshToken = await redis.get(`refreshToken:${payload._id}`);

        if (!cachedRefreshToken) {
            return res.status(401).json({ message: "User is unauthorized!" });
        }

        const isValidRefreshToken = await compare(refreshToken, cachedRefreshToken);

        if (!isValidRefreshToken) {
            redis.del(`refreshToken:${payload._id}`);
            return res.status(401).json({ message: "User is unauthorized!" });
        }

        const accessToken = generateAccessToken({ _id: payload._id, role: payload.role });

        res.cookie("accessToken", accessToken, {
            expires: new Date(Date.now() + configs.auth.accessTokenExpiresInMilliSeconds),
            maxAge: configs.auth.accessTokenExpiresInMilliSeconds,
            ...cookiesOptions,
        });

        return res.json({ message: "Token refreshed successfully!" });
    } catch (err) {
        next(err);
    }
};

module.exports.logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "User is unauthorized!" });
        }

        const payload = verifyRefreshToken(refreshToken);

        if (!payload) {
            return res.status(401).json({ message: "User is unauthorized!" });
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        redis.del(`refreshToken:${payload._id}`);

        return res.status(205).json({});
    } catch (err) {
        next(err);
    }
};
