const mongoose = require("mongoose")

const adminToken = new mongoose.Schema({
    adminId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'admins'
    },
    token: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    expires: true,
    expireAfterSeconds: 60*60*24*30
})

module.exports = mongoose.model("adminTokens", adminToken, "adminTokens")