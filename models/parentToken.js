const mongoose = require("mongoose");

const parentTokenSchema = new mongoose.Schema(
  {
    parentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "parents",
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
  "parentTokens",
  parentTokenSchema,
  "parentTokens"
);
