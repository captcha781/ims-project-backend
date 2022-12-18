const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["super-admin", "admin", "sub-admin"],
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "in-active", "hold"],
    },
    lastActive: {
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
    siteWriteAccess: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/*
  jwt payload = {
    adminId: _id,
  }
*/
// AdminSchema.methods.generateJWT = function (payload) {
//   var token = jwt.sign(payload, config.secretOrKey);
//   return `Bearer ${token}`;
// };

module.exports = mongoose.model("admins", AdminSchema, "admins");
