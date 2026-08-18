import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { authMiddleware } from "../middleweres/authMiddleware.js";

const router = express.Router();

router.use(
    "/add-review/:id",
    authMiddleware,
    createProxyMiddleware({
        target: "http://menu-service:5002",
        changeOrigin: true,

        pathRewrite: (path, req) => {
            return `/review/add-review/${req.params.id}`;
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