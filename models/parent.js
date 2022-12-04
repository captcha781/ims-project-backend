const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema(
  {
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    alternatePhoneNumber: {
      type: String,
      default: "",
    },
    children: {
      type: [mongoose.Types.ObjectId],
      required: true,
      ref: "students",
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "in-active", "hold"],
    },
    salt: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "instituteAdmins",
    },
  },
  {
    timestamps: true,
  }
);

ParentSchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.secretOrKey);
  return `Bearer ${token}`;
};

module.exports = mongoose.model(
    "parents",
    ParentSchema,
    "parents"
)
