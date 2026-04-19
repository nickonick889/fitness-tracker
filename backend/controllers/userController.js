const User = require("../models/User");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET;

exports.create = async(req, res) => {
    const { username, password } = req.body;
    try {
        if (username === " ") {
            return res.status(400).json({ err: "blank name" });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({ username, hashedPassword });

        const payload = { user };
        const token = jwt.sign(payload, SECRET);
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ err });
    }
};

exports.testCreate = async (req, res) => {
    try {
        const usersData = [
            {
            username: "aloy",
            hashedPassword: await bcrypt.hash("123", SALT_ROUNDS),
            },
            {
            username: "jr",
            hashedPassword: bcrypt.hashSync("456", SALT_ROUNDS),
            },
        ];

        await User.deleteMany({});

        const createdUsers = [];

        for (let i = 0; i < usersData.length; i++) {
            const user = await User.create(usersData[i]);
            createdUsers.push(user);
            console.log("new user", user);
        }
        
        res.json(createdUsers);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};