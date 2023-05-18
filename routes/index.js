const express = require("express");
const router = express.Router();
router.use("/v1/calendar", require("./calender"));
module.exports = router;
