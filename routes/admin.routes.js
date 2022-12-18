const express = require("express");
const adminCtrl = require("../controllers/admin.controller");
const adminAuth = require("../middlewares/auth/admin.auth");
const adminValidate = require("../validations/adminValidation")

const router = express.Router({ caseSensitive: true });

//Test Route
router.route("/adminTest").get(adminCtrl.test)

//Authentication Route
router.route("/signin").post(adminAuth, adminValidate.signinValidate, adminCtrl.signin)

//Create Institution
router.route("/institute").post(adminAuth, adminValidate.createInstitute, adminCtrl.createInstitute)

//Create Institution Admin
router.route("/createInstituteAdmin").post(adminAuth, adminValidate.createInstituteAdmin, adminCtrl.createInstituteAdmin)

module.exports = router
