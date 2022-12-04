const mongoose = require("mongoose");
const config = require("../config");

const InstituteAdminModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    instituteId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "institutions",
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "in-active", "hold"],
    },
    administratorType: {
      type: String,
      default: "admin",
      enum: ["admin", "super-admin", "sub-admin"],
    },
    lastLogin: {
      type: Date,
      default: "",
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
      enum: ["site-admin", "instituteAdmin"],
    },
    validTill: {
      type: Date,
      required: true,
    },
    staffWriteAccess: {
      type: Boolean,
      default: false,
    },
    studentWriteAccess: {
      type: Boolean,
      default: false,
    },
    payrollAccess: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

InstituteAdminModel.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.secretOrKey);
  return `Bearer ${token}`;
};

module.exports = mongoose.model(
    "instituteAdmins",
    InstituteAdminModel,
    "instituteAdmins"
)
