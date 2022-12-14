const express = require("express");
const studCtrl = require('../controllers/student.controller');
const studentAuthMiddleware = require("../middlewares/auth/student.auth");
const studValidate = require("../validations/studentValidation")

const router = express.Router({ caseSensitive: true });

router.get("/studentTest", studCtrl.test)

router.route("/signin").post(studentAuthMiddleware, studValidate.signin, studCtrl.signin)

router.route("/viewuser").get(studentAuthMiddleware, studCtrl.viewUser)

module.exports = router
