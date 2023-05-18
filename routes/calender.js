const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calender");
router.get("/init", calendarController.GoogleCalendarInitView);
router.get("/redirect", calendarController.GoogleCalendarRedirectView);
module.exports = router;
