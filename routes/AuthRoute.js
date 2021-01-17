const router = require("express");

const baseRouter = router();

const authRouter = router();

const AuthController = require("../controllers/AuthController");

authRouter.post("/register/", AuthController.signUp);

authRouter.post("/signin/", AuthController.login);

baseRouter.use("/", authRouter);

module.exports = baseRouter;
