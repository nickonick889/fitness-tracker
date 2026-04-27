const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const SECRET = process.env.JWT_SECRET;

const login = async(req, res) => {
  const { username, password } = req.body

  try {
    // validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }
    // find user
    const user = await User.findOne({ username });
    // user error
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }
    // compare password
    const match = await bcrypt.compare(password, user.hashedPassword);
    // password error
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials"})
    }
    // create token
    const payload = {
      userId: user._id,
    }
    const options = { expiresIn: "1h" }
    const token = jwt.sign(payload, SECRET, options)
    // send response
    return res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { login }