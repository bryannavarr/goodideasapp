const router = require("express").Router();
const ideasController = require("../controllers/ideas.controller");
const ideas = require("../models/idea");

module.exports = router;

router.get("/", ideasController.readAll);
router.get("/:id([0-9a-fA-F]{24})", ideasController.readById);
router.post("/", ideasController.create);
router.put("/:id([0-9a-fA-F]{24})", ideasController.update);
router.delete("/:id([0-9a-fA-F]{24})", ideasController.delete);
