import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "akzdf@52gn",
    database: process.env.DB_NAME || "goldstar",
    port: process.env.DB_PORT || 3307
});

export default db;