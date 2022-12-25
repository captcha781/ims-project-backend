const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../lib/generateToken");
const instituteAdmin = require("../models/instituteAdmin");
const studentModel = require("../models/student");
const dtHelper = require("../lib/dateTimeHelper");

const bcrypt = require("bcryptjs");

exports.test = expressAsyncHandler((req, res) => {
  try {
    return res.json({ success: true, message: "Test message", result: [] });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.signin = expressAsyncHandler(async (req, res) => {
  try {
    const body = req.body;

    const admin = await instituteAdmin.findOne({ email: body.email });

    if (admin.status === "in-active") {
      return res.json({
        success: false,
        auth: false,
        message: "Account is in-active",
      });
    } else if (admin.status === "hold") {
      return res.json({
        success: false,
        auth: false,
        message: "Account is on hold",
      });
    }

    let passCheck = await bcrypt.compare(body.password, admin.password);
    if (!passCheck) {
      return res.json({
        success: false,
        auth: false,
        message: "Incorrect password",
      });
    }

    let token = generateToken({
      adminId: admin._id,
      expires: 1000 * 60 * 60 * 24 * 30,
    });
    admin.password = "";

    return res.json({
      success: true,
      auth: true,
      result: admin,
      token,
      type: "insAdmin",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.getUser = expressAsyncHandler(async (req, res) => {
  try {
    let adminer = await instituteAdmin.findById(req.user._id);
    adminer.password = "";
    adminer.salt = "";

    return res.json({ user: adminer });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.createStudent = expressAsyncHandler(async (req, res) => {
  try {
    const body = req.body;

    let studentCheck = await studentModel.findOne({
      studentId: body.studentId,
    });
    let studentRollCheck = await studentModel.findOne({
      studentRoll: body.studentRoll,
    });

    if (studentCheck || studentRollCheck) {
      return res.json({
        success: false,
        message: "Student already exists with this roll number",
      });
    }

    const date = dtHelper.momentFormat(body.dateOfBirth, "dd-mm-yyyy");

    let salt = await bcrypt.genSalt(13);
    let password = await bcrypt.hash(date, salt);

    let data = {
      name: body.name,
      class: body.class,
      classInfo: body.classInfo,
      group: body.group,
      studentId: body.studentId,
      studentRoll: body.studentRoll,
      section: body.section,
      dateOfBirth: body.dateOfBirth,
      parentType: body.parentType,
      fatherName: body.fatherName,
      motherName: body.motherName,
      guardianName: body.guardianName,
      bloodGroup: body.bloodGroup,
      batch: body.batch,
      email: body.email,
      emailSecondary: body.emailSecondary,
      phoneNumber: body.phoneNumber,
      phoneNumberSecondary: body.phoneNumberSecondary,
      fatherPhoneNumber: body.fatherPhoneNumber,
      motherPhoneNumber: body.motherPhoneNumber,
      guardianPhoneNumber: body.guardianPhoneNumber,
      address: body.address,
      addressSecondary: body.addressSecondary,
      town: body.town,
      city: body.city,
      district: body.district,
      state: body.state,
      addressType: body.addressType,
      salt,
      password,
      createdBy: req.user._id,
      instituteId: body.instituteId,
      classRoomId: body.classRoomId,
    };

    const result = await studentModel.create(data);

    return res.json({
      success: true,
      result,
      message: "Student created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});
