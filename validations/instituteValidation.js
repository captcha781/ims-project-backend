const isEmpty = require("../lib/isEmpty");
const regex = require("../constants");
const expressAsyncHandler = require("express-async-handler");
const joi = require("joi");

exports.signin = expressAsyncHandler((req, res, next) => {
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
    return res.json({
      success: false,
      auth: false,
      errors,
      message: "Validation error",
    });
  } else {
    next();
  }
});

exports.createStudent = expressAsyncHandler((req, res, next) => {
  const body = req.body;
  let errors = {};

  let classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  if (isEmpty(body.name)) {
    errors.name = "Name cannot be empty";
  }

  if (isEmpty(body.class)) {
    errors.class = "Class cannot be empty";
  } else if (!classes.includes(body.class)) {
    errors.class = "Invalid class";
  }

  if (isEmpty(body.section)) {
    errors.section = "Sections cannot be empty";
  }

  if (isEmpty(body.dateOfBirth)) {
    errors.dateOfBirth = "Date of birth cannot be empty";
  }

  if (isEmpty(body.batch)) {
    errors.batch = "Batch cannot be empty";
  }

  if (isEmpty(body.studentRoll)) {
    errors.studentRoll = "Roll number required";
  }

  if (!isEmpty(errors)) {
    return res.json({ success: false, errors, message: "Validation error" });
  } else {
    next();
  }
});

exports.createTeacher = expressAsyncHandler(async (req, res, next) => {
  try {
    // const createorSchema = joi.object({
    //   name: joi.string().alphanum().allow(".").min(4).max(100).required(),
    //   instituteId: joi.string().hex().required(),
    //   email: joi.string().email().required(),
    //   phoneNumber: joi
    //     .string()
    //     .regex(/^[0-9+]{10,13}$/)
    //     .messages({ "string.pattern.base": "Phone number is invalid" })
    //     .required(),
    //   secondaryPhoneNumber: joi
    //     .string()
    //     .regex(/^[0-9+]{10,13}$/)
    //     .messages({ "string.pattern.base": "Phone number is invalid" })
    //     .required(),
    //   education: joi.string().allow(""),
    //   dateOfBirth: joi.date().required(),
    //   salary: joi.number().allow(""),
    //   staffType: joi.string().alphanum().allow("-"),
    //   isClassTeacher: joi.boolean().allow(""),
    //   classroomId: joi.string().hex().allow(""),
    //   studentEditAccess: joi.boolean().allow(""),
    //   licenseNumber: joi.string().allow(""),
    //   experience: joi.object({
    //     years: joi.number(),
    //     months: joi.number(),
    //     organisation: joi.string(),
    //     designation: joi.string(),
    //   }).allow(""),
    //   staffId: joi.string().required(),
    //   joinDate: joi.string().allow(""),
    //   password: joi.string().regex(regex.PASSWORD_REGEX).required(),
    //   confirmPassword: joi.string().required(),
    // })
    // let validator = await createorSchema.validateAsync(req.body);
    // console.log(validator);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});
