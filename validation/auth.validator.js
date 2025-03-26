const { z } = require("zod");

module.exports.signupUserSchema = z.object({
    username: z.string().min(5).max(255),
    email: z.string().email(),
    password: z.string().min(7).max(255),
});

module.exports.loginUserSchema = this.signupUserSchema.omit({ username: true });
