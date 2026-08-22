import express from "express";
import comboRoutes from "./routes/comboRoutes.js";
const app = express();


app.use(express.json());
app.use("/uploads",express.static("uploads"));

app.use("/combo",comboRoutes);


app.listen(5003,()=>{
    console.log("Combo service is running on port 5003");
})
