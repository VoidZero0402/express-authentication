const express = require("express");
const controller = require("./../controllers/auth");

const validate = require("./../middlewares/validate");
const { signupUserSchema, loginUserSchema } = require("../validation/auth.validator");

const authGuard = require("./../middlewares/authGuard");

const router = express.Router();

router.post("/signup", validate(signupUserSchema), controller.signup);
router.post("/login", validate(loginUserSchema), controller.login);
router.get("/me", authGuard, controller.getMe);
router.get("/refresh", controller.refresh);
router.get("/logout", controller.logout);

module.exports = router;
