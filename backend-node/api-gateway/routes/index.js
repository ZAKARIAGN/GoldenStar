import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { authMiddleware } from "../middleweres/authMiddleware.js";
import cors from "cors";
import axios from "axios";
import adminMiddleware from "../middleweres/adminMiddleware.js";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const ALLOWED_ORIGIN = "http://localhost:5173";

const corsOptions = {
    origin: ALLOWED_ORIGIN,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.options("/{*path}", cors(corsOptions));




app.post("/auth/register", async (req, res) => {
    try {
        const response = await axios.post("http://auth-service:5001/auth/register", req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Auth Service error" }
        );
    }
});



app.post("/auth/login", async (req, res) => {
    try {
        const response = await axios.post("http://auth-service:5001/auth/login", req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(
            error.response?.data || { message: "Auth Service error" }
        );
    }
});


app.use("/menu/add-item", authMiddleware, adminMiddleware, createProxyMiddleware({
    target: "http://menu-service:5002/menu/add-item",
    changeOrigin: true,
    on: {
        proxyReq: (proxyReq, req, res) => {
            if (req.user) {
                proxyReq.setHeader("x-user-id", req.user.userId);
                proxyReq.setHeader("x-user-role", req.user.role);
            }
        }
    }
}));



app.listen(5000, () => {
    console.log("API Gateway running on port 5000");
});