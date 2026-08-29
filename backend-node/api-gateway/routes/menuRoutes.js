import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

import { authMiddleware } from "../middleweres/authMiddleware.js";
import adminMiddleware from "../middleweres/adminMiddleware.js";

const router = express.Router();


router.use(
    "/get-all-items",
    authMiddleware,
    createProxyMiddleware({
        target: "http://menu-service:5002",
        changeOrigin: true,
        pathRewrite: { "^/": "/menu/get-all-items" },

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
    "/get-item/:id",
    authMiddleware,
    createProxyMiddleware({
        target: "http://menu-service:5002",
        changeOrigin: true,

        pathRewrite: (path, req) => `/menu/get-item/${req.params.id}`,

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
    "/add-item",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://menu-service:5002",
        changeOrigin: true,
        pathRewrite: { "^/": "/menu/add-item" },

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
    "/delete-item/:id",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://menu-service:5002",
        changeOrigin: true,
        pathRewrite: (path, req) => `/menu/delete-item/${req.params.id}`,

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
    "/update-item/:id",
    authMiddleware,
    adminMiddleware,
    createProxyMiddleware({
        target: "http://menu-service:5002",
        changeOrigin: true,
        pathRewrite: (path, req) => `/menu/update-item/${req.params.id}`,

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