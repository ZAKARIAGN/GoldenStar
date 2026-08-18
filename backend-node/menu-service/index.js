import express from "express";
const app = express();
import menuRoutes from "./routes/MenuRoutes.js";
import reviewRoutes from "./routes/ReviewRoutes.js";

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/menu", menuRoutes);
app.use("/review", reviewRoutes);

app.listen(5002, () => {
    console.log("Menu service running on port 5002");
});