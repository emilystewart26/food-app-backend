const User = require("../Models/User")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// TODO: integrate Google OAuth 2 Login / Passport.js


exports.register = async (req, res) => {
    console.log(req.body)
    const { role, username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const user = new User({ 
            role: req.body.role,
            username: req.body.username, 
            email:req.body.email, 
            password: hashedPassword,
         })
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

        const passwordIsMatch = await bcrypt.compare(password, user.password);
        if (!passwordIsMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET,           
            { expiresIn: "2h" }               
        );

        await User.findByIdAndUpdate(user._id, { token: token })

         res.json({ token: token })
    } catch (err) {
         res.status(500).json({ message: err.message })
    }
}