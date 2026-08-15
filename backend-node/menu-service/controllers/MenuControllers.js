import { addItem, deleteItem, getAllItems, getItemById, updateItem } from "../services/MenuServices.js";




export const getAllItemsController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }


        const result = await getAllItems();

        return res.status(200).json({
            message: "Menu items fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}









export const getItemByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }


        const result = await getItemById(id);

        return res.status(200).json({
            message: "Menu item fetched successfully",
            data: result
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}



export const addItemController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];
        const userRole = req.headers["x-user-role"];

        const data = req.body;
        const image = req.file;

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }


        if (String(userRole) !== "1") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await addItem(data, image, userId);

        return res.status(201).json({
            message: "Menu item created successfully"
        });

    } catch (error) {
        if (error.errors) {
            return res.status(error.statusCode || 400).json({
                message: error.message,
                errors: error.errors
            });
        }

        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
};














export const updateItemController = async (req,res)=> {
    try {
        const id = req.params.id;
        const userId = req.headers["x-user-id"];
        const userRole = req.headers["x-user-role"];

        if(!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        if(String(userRole) !== "1") {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const data = req.body;
        const image = req.file;

        await updateItem(id,data,image);

        return res.status(200).json({
            message: "Menu item updated successfully",
        });

    } catch (error) {

        if(error.errors) {
            return res.status(error.statusCode || 400).json({
                message: error.message,
                errors: error.errors
            });
        }
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}















export const deleteItemController = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.headers["x-user-id"];
        const userRole = req.headers["x-user-role"];

        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        if (String(userRole) !== "1") {
            return res.status(403).json({
                message: "Access denied"
            });
        }


        await deleteItem(id);

        return res.status(200).json({
            message: "Menu item deleted successfully",
        });

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}