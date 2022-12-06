const express = require("express");
const instCtrl = require("../controllers/institute.contoller")

const router = express.Router({ caseSensitive: true });

router.get("/instituteTest", instCtrl.test)

module.exports = router
