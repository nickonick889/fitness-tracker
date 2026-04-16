const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET = process.env.JWT_SECRET;
const router = express.Router();

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user === null) {
    res.status(401).json({ err: "no user" });
  }

  const match = await bcrypt.compare(password, user.hashedPassword);

  if (match) {
    const payload = { user, admin: false };
    const token = jwt.sign(payload, SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ err: "wrong password" });
  }
};

const add = (x, y) => x + y;

const storeUser = (user, obj) => {
  obj[0] = user;
};

const loadUser = (place) => {
  return place[0];
};

const isLoggedIn = async (req, res, next) => {
  const header = req.get("Authorization");
  const token = header?.split(" ")?.[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    storeUser(decoded.user, req);
    // req.user = decoded.user;
    next();
  } catch (err) {
    res.status(403).json({ err: "no" });
  }
};

const secret = async (req, res) => {
  const user = loadUser(req);
  // const user = req.user;
  res.json({ user });
};

router.post("/", login);
router.get("/secret", [isLoggedIn], secret);

module.exports = router;
