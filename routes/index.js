var express = require('express');
var router = express.Router();

// Define Controllers
const mainController  = require("../controller/mainController")

/* GET home page. */
router.get("/", mainController.index);
router.post("/convert", mainController.convert);

module.exports = router;
