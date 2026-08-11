import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async(data)=>{
    const {f_name,l_name,email,password,password_confirmation} = data;
    const clientRole = 2;

    if(!f_name||!l_name||!email||!password||!password_confirmation){
        throw new Error("All fields are required");
    }

    if(password !== password_confirmation){
        throw new Error("Passwords do not match");
    }

    const existUser = await db.query("select * from users where email = ?",[email]);
    if(existUser[0].length>0){
        throw new Error("User already exists with this email");
    }


    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    const result = await db.query("insert into users (f_name,l_name,email,password,role_id) values (?,?,?,?,?)", [f_name, l_name, email, hash,clientRole]);
    return result;
}





export const loginUser = async (data)=>{
    const {email,password} = data;

    if(!email||!password){
        throw new Error("Email and password are required");
    }

    const users = await db.query("select * from users where email=?",[email])
    if(users[0].length === 0){
        throw new Error("Invalid email or password");
    }

    const user = users[0][0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }


    const token = jwt.sign({
        userId:user.id,
        email:user.email,
        role:user.role_id,
        
    },
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRES_IN
    });

    return token;
}



