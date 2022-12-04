const mongoose = require("mongoose");

const InstitutionSchema = new mongoose.Schema(
  {
    instituteName: {
      type: String,
      required: true,
    },
    institutionType: {
      type: String,
      required: true,
      enum: ["primary", "secondary", "higherSecondary", "trainingCenter"],
    },
    address: {
      type: String,
      default: "",
    },
    gstInvoiceNumber: {
      type: String,
      default: "",
    },
    institutionEmblem: {
      type: String,
      default: "",
    },
    institutionLogo: {
      type: String,
      default: "",
    },
    administratorMain: {
      type: mongoose.Types.ObjectId,
      ref: "instutionAdmins",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "admins",
    },
    students: {
      type: Number,
      default: 0,
    },
    staffs: {
      type: Number,
      default: 0,
    },
    admins: {
      type: Number,
      default: 0,
    },
    premiumValidity: {
      type: String,
      required: true,
    },
    studentsLimit: {
      type: Number,
      required: true,
    },
    staffsLimit: {
      type: Number,
      required: true,
    },
    adminLimit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "institutions",
  InstitutionSchema,
  "institutions"
);
