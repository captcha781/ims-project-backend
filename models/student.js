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
      type: String,
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
    instituteCode: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    parentType: {
      type: String,
      default: "parent",
      enum: ["parent", "guardian"],
    },
    fatherName: {
      type: String,
      default: ""
    },
    motherName: {
      type: String,
      default: ""
    },
    guardianName: {
      type: String,
      default: ""
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
    guardianPhoneNumber: {
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
    addressSecondary: {
      type: String,
      default: ""
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
      default: "urban",
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
      type: String,
      // required: true,
      default:"",
      ref: "classrooms"
    },
    profilePhoto: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
    expires: true,
  }
);

//payload format:
// {
//   userId: student._id,
//   name: ,
//   instituteId: ,
//   studentRoll: ,
// }

StudentSchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.secretOrKey);
  return `Bearer ${token}`;
};

module.exports = mongoose.model("students", StudentSchema, "students");
