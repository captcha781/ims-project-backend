const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/generateToken");

const adminModel = require("../models/admin");
const instituteModel = require("../models/institution");
const instituteAdmin = require("../models/instituteAdmin");

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
    const admin = await adminModel.findOne({ email: body.email });

    if (!admin) {
      return res.json({ success: false, message: "Administrator not found" });
    }

    if (admin.status === "in-active") {
      return res.json({
        success: false,
        message: "Your account is currently in-active",
      });
    } else if (admin.status === "hold") {
      return res.json({
        success: false,
        message: "Your account is currently on hold",
      });
    }
    // console.log(admin);
    let passCheck = await bcrypt.compare(body.password, admin.password);

    if (!passCheck) {
      return res.json({ success: false, message: "Password is incorrect" });
    }

    const token = await generateToken({ adminId: admin._id });

    admin.password = "";

    return res.json({
      success: true,
      auth: true,
      result: admin,
      token,
      type: "admin",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.createInstitute = expressAsyncHandler(async (req, res) => {
  try {
    const body = req.body;

    let uniqueCheck = await instituteModel.findOne({
      instituteUniqueID: body.uniqueId,
    });
    if (uniqueCheck) {
      return res.json({ success: false, message: "Unique ID already exists" });
    }

    let phoneCheck = await instituteModel.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (phoneCheck) {
      return res.json({
        success: false,
        message: "Phone number already exists",
      });
    }

    let date = new Date(body.premiumValidity);
    let premium = date.toISOString();

    let creator = await instituteModel.create({
      instituteName: body.instituteName,
      institutionType: body.institutionType,
      instituteUniqueID: body.uniqueId,
      email: body.email,
      phoneNumber: body.phoneNumber,
      createdBy: req.user._id,
      premiumValidity: premium,
      studentsLimit: body.studentsLimit,
      staffsLimit: body.staffsLimit,
      adminLimit: body.adminLimit,
    });
    if (creator) {
      return res.json({
        success: true,
        message: "Institute created successfully",
        result: creator,
        prompt: "CREATE_ADMIN",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.createInstituteAdmin = expressAsyncHandler(async (req, res) => {
  try {
    const body = req.body;

    let checkInstitute = await instituteModel.findOne({
      _id: body.instituteId,
      status: "active",
    });
    if (!checkInstitute) {
      return res.json({
        success: false,
        message: "The requested institution may not be found or in-active",
      });
    }

    let premiumDate = new Date(checkInstitute.premiumValidity);
    if (premiumDate.getTime() < Date.now()) {
      return res.json({
        success: false,
        message: "Institution premium has expired",
      });
    }

    let adminCheck = await instituteAdmin.findOne({ email: body.email });
    if (adminCheck) {
      return res.json({
        success: false,
        message: "An admin already exists with this email",
      });
    }

    let salt = await bcrypt.genSalt(15);
    let encPass = await bcrypt.hash(body.password, salt);

    let data = {
      name: body.name,
      instituteId: body.instituteId,
      administratorType: body.administratorType,
      email: body.email,
      salt: salt,
      password: encPass,
      createdBy: req.user._id,
      creator: "site-admin",
      staffWriteAccess: body.staffWriteAccess,
      studentWriteAccess: body.studentWriteAccess,
      payrollAccess: body.payrollAccess,
    };

    const adminCreation = await instituteAdmin.create(data);

    return res.json({
      success: true,
      message: "Admin created successfully",
      result: adminCreation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});
