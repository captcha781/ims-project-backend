const expressAsyncHandler = require("express-async-handler")
const isEmpty = require("../lib/isEmpty")

exports.signin = expressAsyncHandler((req, res, next) => {
    try {
        const body = req.body
        let errors = {}

        if(isEmpty(body.studentRoll)){
            errors.studentRoll = "Roll number cannot be empty"
        }

        if(isEmpty(body.password)){
            errors.password = "Password cannot be empty"
        }

        if(!isEmpty(errors)){
            return res.json({success: false, message: "Validation error", errors})
        } else {
            next()
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Something went wrong'})
    }
})