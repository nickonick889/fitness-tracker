const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 10;
const SECRET = process.env.JWT_SECRET;

exports.create = async (req, res) => {
    // extract request
    try {
        const { username, password } = req.body
        // hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        // create user
        const user = await User.create({
            username,
            hashedPassword,
        })
        // create token
        const payload = {
            userId: user._id,
            username: user.username
        }

        const token = jwt.sign(payload, SECRET)

        // send response
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

