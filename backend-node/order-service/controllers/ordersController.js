import { addOrder } from "../services/ordersServices.js";

export const addOrderController = async (req,res) =>{
    const userId = req.headers["x-user-id"];
    
    if (!userId){
        return res.status(401).json({
            message : "user not authenticated"
        })
    }


    try{
        await addOrder(req.body , userId);

        return res.status(201).json({
            message : "Order added successfully"
        })
    }catch(error){
        if(error.errors){
            return res.status(error.statusCode || 400).json({
                message : error.message,
                errors : error.errors
            })
        }

        return res.status(error.statusCode || 500).json({
            message : error.message
        })
    }
}