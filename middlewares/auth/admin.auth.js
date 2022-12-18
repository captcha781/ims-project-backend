const jwt = require("jsonwebtoken");
const adminTokenModel = require("../../models/adminToken");
const adminModel = require("../../models/admin");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if(token){
      token = token.split(" ")[1]
    }
    if (
      !token &&
      !req.path.includes("signin") &&
      !req.path.includes("forgotpassword") &&
      !req.path.includes("forgotreset")
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

    let admin = await adminModel.findById(decodedToken.adminId);

    if (!admin) {
      return res.json({ auth: false, message: "Admin not found" });
    } else if (admin.status !== "active" && admin.status !== "hold") {
      return res.json({ auth: false, message: "Access Denied" });
    }

    if (
      (token && admin && req.path.includes("signin")) ||
      req.path.includes("forgotpassword") ||
      req.path.includes("forgotreset")
    ) {
      return res
        .status(400)
        .json({ success: false, message: "You're already signed in" });
    }

    req.user = admin;
    next();
  } catch (error) {
    if (
      req.path.includes("signin") ||
      req.path.includes("forgotpassword") ||
      req.path.includes("forgotreset")
    ) {
      return next();
    }
    return res.status(405).json({ auth: false, message: "Invalid token" });
  }
};

module.exports = adminAuthMiddleware;
