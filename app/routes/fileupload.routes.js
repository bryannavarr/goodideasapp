const router = require("express").Router();
const fileUploadController = require("../controllers/fileupload.controller");

module.exports = router;

router.get("/getSignedUrl", fileUploadController.sign);
