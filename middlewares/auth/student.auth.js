const jwt = require("jsonwebtoken");
const studentTokenModel = require("../../models/studentToken");
const studentModel = require("../../models/student");

const studentAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.json({ auth: false, message: "Token not found" });
    }
    jwt.verify(token, process.env.SECRET_OR_KEY);
    let decodedToken = jwt.decode(token);

    let student = await studentModel.findById(decodedToken);

    if (!student) {
      return res.json({ auth: false, message: "User not found" });
    } else if (student.status !== "active" && student.status !== "archived") {
      return res.json({ auth: false, message: "Access not allowed" });
    }

    req.user = student;
    next();
  } catch (error) {
    console.log(error);
    return res.status(405).json({ auth: false, message: "Invalid token" });
  }
};
