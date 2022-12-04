const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  years: {
    type: Number,
    default: 0,
  },
  months: {
    type: Number,
    default: 0,
  },
});

const TeacherSchema = new mongoose.Schema(
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
    education: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "in-active", "hold", "archived"],
    },
    salary: {
      type: String,
      default: "",
    },
    staffType: {
      type: String,
      required: true,
      enum: [
        "principal",
        "vice-principal",
        "adminstrative-officer",
        "transport-incharge",
        "office-staff",
        "teacher",
      ],
    },
    isClassTeacher: {
      type: Boolean,
      default: false,
    },
    classroomId: {
      type: mongoose.Types.ObjectId,
      default: "",
    },
    subjects: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "subjects",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "instituteAdmins",
    },
    studentEditAccess: {
      type: Boolean,
      default: false,
    },
    licenseNumber: {
      type: String,
      default: "",
    },
    experience: {
      type: experienceSchema,
    },
    lastActive: {
      type: Date,
      default: "",
    },
    staffId: {
      type: String,
      default: "",
    },
    joinDate: {
      type: Date,
      default: "",
    },
    leavingDate: {
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
  },
  {
    timestamps: true,
  }
);

TeacherSchema.methods.generateJWT = function (payload) {
  var token = jwt.sign(payload, config.secretOrKey);
  return `Bearer ${token}`;
};

module.exports = mongoose.model("staffs", TeacherSchema, "staffs");
