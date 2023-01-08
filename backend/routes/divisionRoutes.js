const express = require("express");
const divisionController = require("../controllers/divisionController");

const router = express.Router();

router.post("/createDivision", divisionController.createDivision);
router.get("/getDivisions", divisionController.getDivisions)

module.exports = router;