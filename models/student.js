const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    },
    classInfo: {
      type: mongoose.Types.ObjectId,
      default: "",
    },
    group: {
      type: String,
      default: ""
    },
    studentId: {
      type: String,
      default: ""
    },
    studentRoll: {
      type: String,
      default: ""
    },
    section: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      default: "",
    },
    batch: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
    emailSecondary: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    phoneNumberSecondary: {
      type: String,
      default: "",
    },
    fatherPhoneNumber: {
      type: String,
      default: "",
    },
    motherPhoneNumber: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: "",
    },
    otpExpiryTime: {
      type: String,
      default: "",
    },
    tempMail: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "in-active", "hold", "archived"],
    },
    address: {
      type: String,
      default: "",
    },
    town: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    district: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    addressType: {
      type: String,
      default: "",
      enum: ["urban", "village", "town"],
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastActive: {
      type: Date,
      default: "",
    },
    fees: {
      type: Number,
      default: 0,
    },
    feesTerm: {
      type: [Number],
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "instituteAdmins",
    },
    instituteId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "institutions",
    },
    classRoomId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "classrooms"
    }
  },
  {
    timestamps: true,
    expires: true,
    expireAfterSeconds: 60 * 60 * 24 * 30,
  }
);

StudentSchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.secretOrKey);
  return `Bearer ${token}`;
};

module.exports = mongoose.model("students", StudentSchema, "students");
