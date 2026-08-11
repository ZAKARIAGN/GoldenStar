import { registerUser, loginUser } from "../services/AuthService.js";

export const RegisterController = async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json({ message: "User registered successfully", result });
    } catch (error) {
        const isClientError = ["All fields are required", "Passwords do not match", "User already exists with this email"].includes(error.message);
        res.status(isClientError ? 400 : 500).json({ message: isClientError ? error.message : "Internal server error" });
    }
}



export const LoginController = async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        const isClientError = ["Email and password are required", "Invalid email or password"].includes(error.message);
        res.status(isClientError ? 400 : 500).json({ message: isClientError ? error.message : "Internal server error" });
    }
}