const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const header = req.get("Authorization");

    if (!header) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Extract token
    const token = header.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET);

    // Attach to request
    req.user = decoded;

    // Continue to next middleware/controller
    next();

  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;