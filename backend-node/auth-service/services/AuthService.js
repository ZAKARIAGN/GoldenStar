import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (data) => {
    const { f_name, l_name, email, password, password_confirmation } = data;
    const clientRole = 2;
    const errors = {}

    if (!f_name || f_name.trim() === "") {
        errors.f_name = "First name is required"
    }

    if (!l_name || l_name.trim() === "") {
        errors.l_name = "Last name is required"
    }

    if (!email || email.trim() === "") {
        errors.email = "Email is required"
    }

    if (!password || password.trim() === "") {
        errors.password = "Password is required"
    }

    if (!password_confirmation || password_confirmation.trim() === "") {
        errors.password_confirmation = "Password confirmation is required"
    }

    if (password !== password_confirmation) {
        errors.password_confirmation = "Passwords do not match";
    }



    const existUser = await db.query("select * from users where email = ?", [email]);
    if (existUser[0].length > 0) {
        errors.email = "User already exists with this email";
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    try {

        const result = await db.query("insert into users (f_name,l_name,email,password,role_id) values (?,?,?,?,?)", [f_name, l_name, email, hash, clientRole]);
        return result;
    } catch (error) {
        if (error.statusCode) {
            throw error
        }

        const dbError = new Error("Failed to create user");
        dbError.statusCode = 500;
        throw dbError;
    }


}





export const loginUser = async (data) => {
    const { email, password } = data;

    const errors = {};

    if (!email || email.trim() === "") {
        errors.email = "Email is required";
    }

    if (!password || password.trim() === "") {
        errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
        const error = new Error("Validation failed");
        error.statusCode = 400;
        error.errors = errors;
        throw error;
    }

    const [users] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (users.length === 0) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role_id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return token;
};


