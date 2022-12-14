const jwt = require("jsonwebtoken");
const studentTokenModel = require("../../models/studentToken");
const studentModel = require("../../models/student");

const studentAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if(token){
      token = token.split(" ")[1]
    }
    
    if (
      !token &&
      !req.path.includes("signin") &&
      !req.path.includes("forgotpassword") 
      // !req.path.includes("forgotreset")
    ) {
      return res.json({
        success: false,
        auth: false,
        message: "Token not found",
      });
    }
    if (!token) {
      token = "noToken";
    }
    let verify = jwt.verify(token, process.env.SECRET_OR_KEY);
    let decodedToken = jwt.decode(token);
    
    let student = await studentModel.findById(decodedToken.studentId);
    
    if (!student) {
      return res.json({ auth: false, message: "Student not found" });
    } else if (student.status !== "active") {
      return res.json({ auth: false, message: "Access Denied" });
    }

    if (
      (token && student && req.path.includes("signin")) ||
      req.path.includes("forgotpassword")
      // req.path.includes("forgotreset")
      ) {
        return res
        .status(400)
        .json({ success: false, message: "You're already signed in" });
      }
      
      req.user = student;
    next();
  } catch (error) {
    if (
      req.path.includes("signin") ||
      req.path.includes("forgotpassword")
      // req.path.includes("forgotreset")
    ) {
      return next();
    }
    return res.status(405).json({ auth: false, message: "Invalid token" });
  }
};

module.exports = studentAuthMiddleware;
