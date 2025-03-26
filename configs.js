module.exports = {
    port: parseInt(process.env.PORT),

    database: {
        uri: process.env.MONGO_URI,
    },

    cookies: {
        secret: process.env.COOKIES_SECRET
    },

    auth: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
        refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES,
        accessTokenExpiresInMilliSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS),
        refreshTokenExpiresInMilliSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS),
    },
};
