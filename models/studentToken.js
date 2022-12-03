const mongoose = require("mongoose")

const StudentTokenSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'students'
    },
    token: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("studentTokens", StudentTokenSchema, "studentTokens")


