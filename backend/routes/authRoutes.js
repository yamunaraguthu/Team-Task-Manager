const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");


// SIGNUP ROUTE
router.post("/signup", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        // simple validation
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // save user
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// LOGIN ROUTE
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;
