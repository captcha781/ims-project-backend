const isEmpty = require("../lib/isEmpty")
const regex = require("../constants")
const expressAsyncHandler = require("express-async-handler")

exports.signin = expressAsyncHandler((req, res, next) => {
    const body = req.body
    let errors = {}

    if(isEmpty(body.email)){
        errors.email = "Email cannot be empty"
    } else if(!regex.EMAIL_REGEX.test(body.email)){
        errors.email = "Email is invalid"
    }

    if(isEmpty(body.password)){
        errors.password = "Password cannot be empty"
    } else if (!regex.PASSWORD_REGEX.test(body.password)){
        errors.password = "Password is invalid"
    }

    if(!isEmpty(errors)){
        return res.json({success: false, auth: false, errors, message: "Validation error"})
    } else {
        next()
    }

})

exports.createStudent = expressAsyncHandler((req, res, next) => {
    const body = req.body
    let errors = {}
    
    let classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

    if(isEmpty(body.name)){
        errors.name = "Name cannot be empty"
    }

    if(isEmpty(body.class)){
        errors.class = "Class cannot be empty"
    } else if(!classes.includes(body.class)){
        errors.class = "Invalid class"
    }

    if(isEmpty(body.section)){
        errors.section = "Sections cannot be empty"
    }

    if(isEmpty(body.dateOfBirth)){
        errors.dateOfBirth = "Date of birth cannot be empty"
    }

    if(isEmpty(body.batch)) {
        errors.batch = "Batch cannot be empty"
    }

    if(isEmpty(body.studentRoll)){
        errors.studentRoll = "Roll number required"
    }

    if(!isEmpty(errors)){
        return res.json({success:false, errors, message: "Validation error"})
    } else {
        next()
    }

})