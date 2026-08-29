import express from "express";
import { authMiddleware } from "../middleweres/authMiddleware.js";
import adminMiddleware from "../middleweres/adminMiddleware.js";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const router = express.Router();

router.use(
    "/add-booking",
    authMiddleware,
    createProxyMiddleware({
        target: "http://booking-service:5005",
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/bookings/add-booking";
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader(
                        "x-user-id",
                        req.user.userId
                    );

                    proxyReq.setHeader(
                        "x-user-role",
                        req.user.role
                    );
                }
                fixRequestBody(proxyReq, req);
            }
        }
    })
);

router.use(
    "/get-all-bookings",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://booking-service:5005",
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return "/bookings/get-all-bookings";
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader(
                        "x-user-id",
                        req.user.userId
                    );

                    proxyReq.setHeader(
                        "x-user-role",
                        req.user.role
                    );
                }
                fixRequestBody(proxyReq, req);
            }
        }
    })
);


router.use(
    "/update-status/:id",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://booking-service:5005",
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return `/bookings/update-status/${req.params.id}`;
        },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader(
                        "x-user-id",
                        req.user.userId
                    );

                    proxyReq.setHeader(
                        "x-user-role",
                        req.user.role
                    );
                }
                fixRequestBody(proxyReq, req);
            }
        }
    })
)

export default router;