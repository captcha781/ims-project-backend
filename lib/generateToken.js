const jwt = require("jsonwebtoken")

module.exports = (data) => {
    return "Bearer " + jwt.sign(data, process.env.SECRET_OR_KEY)
}