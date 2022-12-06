const expressAsyncHandler = require("express-async-handler")
exports.test = expressAsyncHandler((req, res) => {
    try {
        return res.json({success: true, message: "Test message", result: []})
    } catch (error) {
        return res.status(500).json({success: false, message: "Something went wrong"})
    }
})