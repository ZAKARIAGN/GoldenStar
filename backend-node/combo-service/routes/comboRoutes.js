import express from "express"
import { addComboController, deleteComboController, getAllcombosController, updateComboController } from "../controllers/comboController.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();


router.post("/add-combo",upload.single("image"),addComboController);
router.put("/update-combo/:id",upload.single("image"),updateComboController);
router.delete("/delete-combo/:id",deleteComboController);
router.get("/get-all-combos",getAllcombosController);


export default router;