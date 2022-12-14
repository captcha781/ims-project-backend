const express = require("express");
const instCtrl = require("../controllers/institute.contoller");
const instValidate = require("../validations/instituteValidation")
const instituteAuthMiddleware = require("../middlewares/auth/institute.auth");

const router = express.Router({ caseSensitive: true });

router.get("/instituteTest", instCtrl.test)

router.route("/signin").post(instituteAuthMiddleware, instValidate.signin, instCtrl.signin)
router.route("/viewuser").get(instituteAuthMiddleware, instCtrl.getUser)

// for staffs
router.route("/teacher").post(instituteAuthMiddleware, instValidate.createTeacher, instCtrl.createTeacher)

// for students
router.route("/student").post(instituteAuthMiddleware, instValidate.createStudent, instCtrl.createStudent)

module.exports = router
