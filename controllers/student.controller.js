const expressAsyncHandler = require("express-async-handler")
const studentModel = require("../models/student")
const dtHelper = require("../lib/dateTimeHelper")
const bcrypt = require("bcryptjs")
const generateToken = require("../lib/generateToken")

exports.test = expressAsyncHandler((req, res) => {
    try {
        return res.json({success: true, message: "Test message", result: []})
    } catch (error) {
        return res.status(500).json({success: false, message: "Something went wrong"})
    }
})

exports.signin = expressAsyncHandler(async (req, res) => {
    try {
        const body = req.body
        let studentFind = await studentModel.findOne({studentRoll: body.studentRoll})

        if(!studentFind){
            return res.json({success: false, message: "Cannot find roll number"})
        }

        if(studentFind.status === "in-active"){
            return res.json({success: false, message: "Your account is currently in-active"})
        } else if(studentFind.status === "hold") {
            return res.json({success: false, message: "Your account is currently on hold"})
        } else if(studentFind.status === "archived"){
            return res.json({success: false, message: "Your account is archived"})
        }

        const date = dtHelper.momentFormat(body.password, "dd-mm-yyyy");

        let passCompare = await bcrypt.compare(date, studentFind.password)

        if(!passCompare){
            return res.json({success: false, message: "Incorrect password"})
        }

        let token = generateToken({studentId: studentFind._id, expires: 1000*60*60*24*30})
        studentFind.password = ""

        return res.json({
            success: true,
            auth: true,
            result: studentFind,
            token,
            type: "student",
          });

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: 'Something went wrong'})
    }
})