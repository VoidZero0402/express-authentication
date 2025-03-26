const { sign, verify, TokenExpiredError } = require("jsonwebtoken");
const { hash } = require("bcryptjs");
const redis = require("./../redis");
const configs = require("../configs");

module.exports.generateAccessToken = (payload) => {
    const accessToken = sign(payload, configs.auth.accessTokenSecret, {
        expiresIn: configs.auth.accessTokenExpires,
    });

    return accessToken;
};

module.exports.verifyAccessToken = (accessToken) => {
    try {
        const payload = verify(accessToken, configs.auth.accessTokenSecret);
        return payload;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return null;
        }

        throw err;
    }
};

module.exports.generateRefreshToken = (payload) => {
    const refreshToken = sign(payload, configs.auth.refreshTokenSecret, {
        expiresIn: configs.auth.refreshTokenExpires,
    });

    return refreshToken;
};

module.exports.verifyRefreshToken = (refreshToken) => {
    try {
        const payload = verify(refreshToken, configs.auth.refreshTokenSecret);
        return payload;
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            return null;
        }

        throw err;
    }
};

module.exports.cookiesOptions = {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
};

module.exports.setJWTCookies = async (res, payload) => {
    const accessToken = this.generateAccessToken({ ...payload });
    const refreshToken = this.generateRefreshToken({ ...payload });

    const hashedRefreshToken = await hash(refreshToken, 12);

    redis.set(`refreshToken:${payload._id}`, hashedRefreshToken, { EX: configs.auth.refreshTokenExpiresInMilliSeconds });

    res.cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + configs.auth.accessTokenExpiresInMilliSeconds),
        maxAge: configs.auth.accessTokenExpiresInMilliSeconds,
        ...this.cookiesOptions,
    });

    res.cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + configs.auth.refreshTokenExpiresInMilliSeconds),
        maxAge: configs.auth.refreshTokenExpiresInMilliSeconds,
        ...this.cookiesOptions,
    });
};
