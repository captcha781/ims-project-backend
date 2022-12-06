const express = require("express");
const stfCtrl = require("../controllers/student.controller")

const router = express.Router({ caseSensitive: true });

router.get("/staffTest", stfCtrl.test)

module.exports = router
