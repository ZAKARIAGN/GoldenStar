import { registerUser, loginUser } from "../services/AuthService.js";

export const RegisterController = async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json({ message: "User registered successfully", result });
    } catch (error) {
        if (error.errors) {
            return res.status(error.statusCode || 400).json({
                message: error.message,
                errors: error.errors
            })
        }
        return res.status(error.statusCode || 500).json({
            message: error.message
        });


    }
}



export const LoginController = async (req, res) => {
    try {
        const token = await loginUser(req.body);
        res.cookie("accessToken", token, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        if (error.errors) {
            return res.status(error.statusCode || 400).json({
                message: error.message,
                errors: error.errors
            })
        }
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}