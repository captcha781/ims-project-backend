const express = require("express");
const adminCtrl = require("../controllers/admin.controller")

const router = express.Router({ caseSensitive: true });

router.get("/adminTest", adminCtrl.test)

module.exports = router
