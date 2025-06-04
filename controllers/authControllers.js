const User = require("../Models/User")
const mongoose = require("mongoose")

// TODO: integrate Google OAuth 2 Login / Passport.js


exports.register = async (req, res) => {
    console.log(req.body)
    const { role, username, email, password } = req.body
    try {
        const user = new User({ role, username, email, password })
        await user.save()
        return res.status(201).json({ message: "Account registered successfully" })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        if (user.password !== password) {
             return res.status(401).json({ message: "Invalid credentials" })
        }

        const token =
            new Date().getTime().toString() +
            Math.random().toString(36).substring(2, 15)

        await User.findByIdAndUpdate(user._id, { token: token })

         res.json({ token: token })
    } catch (err) {
         res.status(500).json({ message: err.message })
    }
}