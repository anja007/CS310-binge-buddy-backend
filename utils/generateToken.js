const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { id: user.userId, email: user.email, role: user.role},
        process.env.JWT_SECRET,
    )
}

module.exports = generateToken;