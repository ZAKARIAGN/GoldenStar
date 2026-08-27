import express from "express";
import { addOrderController, getAllOrdersController } from "../controllers/ordersController.js";
const router = express.Router();

router.post("/add-order", addOrderController);
router.get("/get-all-orders", getAllOrdersController);

export default router;
