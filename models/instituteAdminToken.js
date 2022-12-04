const mongoose = require("mongoose");

const instituteAdminTokenSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "instituteAdmins",
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "instituteAdminTokens",
  instituteAdminTokenSchema,
  "instituteAdminTokens"
);
