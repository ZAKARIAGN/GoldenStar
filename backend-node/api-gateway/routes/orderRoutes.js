import express from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { authMiddleware } from "../middleweres/authMiddleware.js";
const router = express.Router();


router.use(
    "/add-order",
    authMiddleware,
    createProxyMiddleware({
        target: "http://order-service:5004",
        changeOrigin: true,
        pathRewrite: { "^/": "/order/add-order" },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader(
                        "x-user-id",
                        req.user.userId
                    );
                }
                fixRequestBody(proxyReq, req);
            }
        }
    })
);



router.use(
    "/get-all-orders",
    authMiddleware,
    createProxyMiddleware({
        target: "http://order-service:5004",
        changeOrigin: true,
        pathRewrite: { "^/": "/order/get-all-orders" },
        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader(
                        "x-user-id",
                        req.user.userId
                    );
                }
                fixRequestBody(proxyReq, req);
            }
        }
    })
);

router.use(
    "/update-order-status/:orderId",
    authMiddleware,
    createProxyMiddleware({
        target: "http://order-service:5004",
        changeOrigin: true,

        pathRewrite: (path, req) =>
            `/order/update-order-status/${req.params.orderId}`,

        on: {
            proxyReq: (proxyReq, req) => {
                if (req.user) {
                    proxyReq.setHeader(
                        "x-user-id",
                        req.user.userId
                    );
                }

                fixRequestBody(proxyReq, req);
            }
        }
    })
);

export default router;