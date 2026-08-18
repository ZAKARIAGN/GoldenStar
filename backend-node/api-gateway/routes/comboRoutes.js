import express from "express";
import { authMiddleware } from "../middleweres/authMiddleware.js";
import adminMiddleware from "../middleweres/adminMiddleware.js";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const router = express.Router();



router.use(
    "/add-combo",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://combo-service:5003",
        changeOrigin: true,
        pathRewrite: {
            "^/": "/combo/add-combo"
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
    "/update-combo/:id",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://combo-service:5003",
        changeOrigin: true,
        pathRewrite: {
            "^/": "/combo/update-combo/:id"
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
    "/delete-combo/:id",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://combo-service:5003",
        changeOrigin: true,
        pathRewrite: {
            "^": "/combo/delete-combo/:id"
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

export default router;