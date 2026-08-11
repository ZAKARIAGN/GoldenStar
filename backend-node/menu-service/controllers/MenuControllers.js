import { addItem } from "../services/MenuServices.js";

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

        await addItem(
            data,
            image,
            userId
        );

        return res.status(201).json({
            message: "Menu item created successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }

}