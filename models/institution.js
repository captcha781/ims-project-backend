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
      enum: ["Primary", "Secondary", "Higher-Secondary", "Training Center"],
    },
    status: {
      type: String,
      default:"active",
      enum: ['active', 'in-active', 'hold']
    },
    address: {
      type: String,
      default: "",
    },
    instituteUniqueID: {
      type: String,
      required: true
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
    // administratorMain: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "instutionAdmins",
    //   default: "",
    // },
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
    groups: {
      type: [String],
      default: [],
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
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
