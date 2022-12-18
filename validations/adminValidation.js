const expressAsyncHandler = require("express-async-handler");
const isEmpty = require("../lib/isEmpty");
const {isBoolean} = require("../lib/isEmpty");
const regex = require("../constants");

exports.signinValidate = expressAsyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    let errors = {};

    if (isEmpty(body.email)) {
      errors.email = "Email cannot be empty";
    } else if (!regex.EMAIL_REGEX.test(body.email)) {
      errors.email = "Email is invalid";
    }

    if (isEmpty(body.password)) {
      errors.password = "Password cannot be empty";
    } else if (!regex.PASSWORD_REGEX.test(body.password)) {
      errors.password = "Password is invalid";
    }

    if (!isEmpty(errors)) {
      return res
        .status(400)
        .json({ success: false, message: "Validation error", errors });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.createInstitute = expressAsyncHandler(async (req, res, next) => {
  try {
    const body = req.body;
    let errors = {};
    let insType = ["Primary", "Secondary", "Higher-Secondary", "Training Center"];

    if (isEmpty(body.instituteName)) {
      errors.instituteName = "Institution name cannot be empty";
    }

    if (isEmpty(body.institutionType)) {
      errors.institutionType = "Institution type cannot be empty";
    } else if (!insType.includes(body.institutionType)) {
      errors.institutionType = "Institution type is invalid";
    }

    if (isEmpty(body.email)) {
      errors.email = "Email cannot be empty";
    } else if (!regex.EMAIL_REGEX.test(body.email)) {
      errors.email = "Invalid email";
    }

    if (isEmpty(body.phoneNumber)) {
      errors.phoneNumber = "Phone number cannot be empty";
    } else if (!regex.PHONE_REGEX.test(body.phoneNumber)) {
      errors.phoneNumber = "Phone number is in invalid format";
    }

    if (isEmpty(body.uniqueId)) {
      errors.uniqueId = "Unique ID cannot be empty";
    }

    if (!isEmpty(errors)) {
      return res.json({ success: false, errors, message: "Validation error" });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

exports.createInstituteAdmin = expressAsyncHandler((req, res, next) => {
  try {
    const body = req.body
    let errors = {}
    const adminType = ["admin", "super-admin", "sub-admin"]

    if(isEmpty(body.name)){
      errors.name = "Adminstrator name cannot be empty"
    }

    if(isEmpty(body.email)){
      errors.email = "Email cannot be empty"
    } else if(!regex.EMAIL_REGEX.test(body.email)){
      errors.email = "Invalid email"
    }

    if(isEmpty(body.instituteId)){
      errors.instituteId = "Invalid institute ID"
    }

    if(isEmpty(body.administratorType)){
      errors.administratorType = "Administrator type cannot be empty"
    } else if(!adminType.includes(body.administratorType)){
      errors.administratorType = "Invalid administrator type"
    }

    if(isEmpty(body.password)){
      errors.password = "Password cannot be empty"
    } else if(!regex.PASSWORD_REGEX.test(body.password)){
      errors.password = "Invalid password"
    }

    if(isEmpty(body.confirmPassword)){
      errors.confirmPassword = "Confirm password cannot be empty"
    } else if (body.password !== body.confirmPassword){
      errors.password = "Passwords should match"
      errors.confirmPassword = "Passwords should match"
    }

    if(isEmpty(body.staffWriteAccess)){
      errors.staffWriteAccess = "Invalid input type"
    }
    if(isEmpty(body.studentWriteAccess)){
      errors.studentWriteAccess = "Invalid input type"
    }
    if(isEmpty(body.payrollAccess)){
      errors.payrollAccess = "Invalid input type"
    }

    if(!isEmpty(errors)){
      return res.json({success: false, errors, message: "Validation Error"})
    } else {
      next()
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: 'Something went wrong'})
  }
})
