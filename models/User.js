const mongoose = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { Role } = require("./../constants/auth");

const schema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minLength: 5,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: [Role.USER, Role.ADMIN],
            default: Role.USER,
        },
    },
    { timestamps: true }
);

schema.pre("save", async function (next) {
    this.password = await hash(this.password, 12);
    next();
});

schema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

const UserModel = mongoose.model("User", schema);

module.exports = UserModel;
