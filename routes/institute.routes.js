const express = require("express");
const instCtrl = require("../controllers/institute.contoller");
const instValidate = require("../validations/instituteValidation")
const instituteAuthMiddleware = require("../middlewares/auth/institute.auth");

const router = express.Router({ caseSensitive: true });

router.get("/instituteTest", instCtrl.test)

router.route("/signin").post(instituteAuthMiddleware, instValidate.signin, instCtrl.signin)
<<<<<<< HEAD

=======
router.route("/viewuser").get(instituteAuthMiddleware, instCtrl.getUser)
>>>>>>> e8a05bc (institute)
router.route("/student").post(instituteAuthMiddleware, instValidate.createStudent, instCtrl.createStudent)

module.exports = router
