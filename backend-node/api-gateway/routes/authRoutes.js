import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const response = await axios.post(
            "http://auth-service:5001/auth/register",
            req.body
        );

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                message: "Auth Service error"
            }
        );
    }
});

router.post("/login", async (req, res) => {
    try {
        const response = await axios.post(
            "http://auth-service:5001/auth/login",
            req.body
        );

        const setCookie = response.headers["set-cookie"];
        if (setCookie) {
            res.setHeader("Set-Cookie", setCookie);
        }

        res.status(response.status).json(response.data);

    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || {
                message: "Auth Service error"
            }
        );
    }
});

export default router;