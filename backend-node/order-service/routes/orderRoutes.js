import express from "express";
import { addOrderController, getAllOrdersController, updateOrderStatusController } from "../controllers/ordersController.js";
const router = express.Router();

router.post("/add-order", addOrderController);
router.get("/get-all-orders", getAllOrdersController);
router.patch("/update-order-status/:orderId", updateOrderStatusController);

export default router;
