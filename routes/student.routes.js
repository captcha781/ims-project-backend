const express = require("express");
const studCtrl = require('../controllers/student.controller')

const router = express.Router({ caseSensitive: true });

router.get("/studentTest", studCtrl.test)

module.exports = router
