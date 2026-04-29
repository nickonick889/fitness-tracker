const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET;

exports.create = async (req, res) => {
  try {
    // 🔹 1. Extract input
    const { username, password } = req.body;

    // 🔹 2. Validate input
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password required",
      });
    }

    // 🔹 3. Check duplicate user
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        error: "Username already taken",
      });
    }

    // 🔹 4. Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 🔹 5. Create user
    const user = await User.create({
      username,
      hashedPassword,
    });

    // 🔹 6. Create token
    const payload = {
      userId: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    // 🔹 7. Send response (token + user)
    res.status(201).json({
      token,
      user: {
        userId: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};