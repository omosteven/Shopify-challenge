const router = require("express");

const baseRouter = router();

const processImageRouter = router();

const ProcessImageController = require("../controllers/ProcessImageController");

processImageRouter.post("/add/", ProcessImageController.addImages);

// more end points  be added here for more features.
baseRouter.use("/", processImageRouter);

module.exports = baseRouter;
