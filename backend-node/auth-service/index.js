import express from "express";
const app = express();
import AuthRoute from "./routes/AuthRoute.js";

app.use(express.json());

app.use("/auth", AuthRoute);

app.listen(5001, () => {
    console.log("server is running on port 5001");
});