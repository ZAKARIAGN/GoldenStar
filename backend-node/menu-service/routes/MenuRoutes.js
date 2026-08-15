import express from "express";
const router = express.Router();
import { addItemController, deleteItemController, getAllItemsController, getItemByIdController, updateItemController } from "../controllers/MenuControllers.js";
import upload from "../middleware/uploadMiddleware.js";


router.get("/get-item/:id", getItemByIdController);
router.post("/add-item", upload.single("image"), addItemController);
router.get("/get-all-items", getAllItemsController);
router.delete("/delete-item/:id", deleteItemController);
router.put("/update-item/:id", upload.single("image"), updateItemController);

export default router;
