const express = require("express");
const recordController = require("../controllers/recordController");

const router = express.Router();

router.post("/createRecord", recordController.createRecord);
router.post("/getRecords", recordController.getRecords);
router.post("/deleteRecord", recordController.deleteRecord);

module.exports = router;
