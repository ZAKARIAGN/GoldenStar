import db from "../../auth-service/config/db.js"

export const addItem = (data, uploadedImage, userId) => {
    const {name,description,price,category} = data
    const image = uploadedImage ? uploadedImage.path : data.image;

    if(!name || !description || !price || !category || !image){
        throw new Error("all fields are required")
    }
    
    const item = db.query("insert into items(user_id,name,description,price,category,image_path) values(?,?,?,?,?,?)",[userId,name,description,price,category,image])
     return item;
}