const express = require("express");
const prtlCtrl = require("../controllers/parent.controller")

const router = express.Router({ caseSensitive: true });

router.get("/parentTest", prtlCtrl.test)

module.exports = router
