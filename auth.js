const jwt = require("jsonwebtoken");
const JWT_SECRET = "secret123";

const auth = (req, res, next) => {
    const token = req.headers.tkn;
    if (!token) return res.status(401).json({ msg: "No token provided" });

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(403).json({ msg: "Invalid token" });
    }
};

module.exports = auth;
