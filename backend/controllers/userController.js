const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET;

exports.create = async(req, res) => {
    const { username, password } = req.body;
        console.log("Body:", req.body);
        console.log("Password:", password)
    try {
        if (username === " ") {
            return res.status(400).json({ err: "blank name" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({ username, hashedPassword });

        const payload = { user };
        const token = jwt.sign(payload, SECRET);
        console.log("SECRET:", SECRET)
        res.status(201).json({ token });
    } catch (err) {
        console.log("Error:", err)
        res.status(500).json({ err });
    }
};
