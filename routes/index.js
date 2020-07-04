var express = require('express');
var router = express.Router();

// Define Controllers
const mainController  = require("../controller/mainController")

/* GET home page. */
router.get("/", mainController.index);
router.get("/image", mainController.index);
router.get("/video", mainController.videoIndex);
router.post("/videoconvert", mainController.convertmpfour);
router.post("/convert", mainController.convert);

module.exports = router;
