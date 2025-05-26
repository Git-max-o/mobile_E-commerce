import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (error) {
        console.error(`Error in user registration: ${error.message}`);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};




export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send response with user data and token
        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error(`Error logging in: ${error.message}`);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};



export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate user ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        // Find user by ID and exclude password from the response
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin, // Including `isAdmin` flag
                createdAt: user.createdAt, // Providing account creation date for context
            },
        });
    } catch (error) {
        console.error(`Error retrieving user profile: ${error.message}`);
        res.status(500).json({ error: "Server error, please try again later" });
    }
};