import { addCombo, deleteComboService, getAllcombos, getAllMenuItems, getComboById, updateCombo } from "../services/comboServices.js";

export const addComboController = async (req, res) => {
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

    try {
        await addCombo(req.body, req.file);

        return res.status(201).json({
            message: "Combo created successfully"
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
}


export const updateComboController = async (req, res) => {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];
    const comboId = req.params.id;

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

    if (!comboId) {
        return res.status(400).json({
            message: "Combo ID is required"
        });
    }

    try {
        await updateCombo(Number(comboId), req.body, req.file);

        return res.status(200).json({
            message: "Combo updated successfully"
        });
    }
    catch (error) {
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
}



export const deleteComboController = async (req, res) => {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];
    const comboId = req.params.id;

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

    if (!comboId) {
        return res.status(400).json({
            message: "Combo ID is required"
        });
    }

    try {
        await deleteComboService(comboId);

        return res.status(200).json({
            message: "Combo deleted successfully"
        });
    }
    catch (error) {
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
}


export const getAllcombosController = async (req, res) => {
    const userId = req.headers["x-user-id"];

    if (!userId) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }

    try {
        const combos = await getAllcombos(userId);
        return res.status(200).json(combos);
    } catch (error) {
        if (error.response) {
            return res.status(error.statusCode || 500).json({
                message: error.response.data.message
            });
        }
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}


export const getComboByIdController = async (req, res) => {
    const userId = req.headers["x-user-id"];
    const comboId = req.params.id;

    if (!userId) {
        return res.status(401).json({
            message: "User not authenticated"
        });
    }

    if (!comboId) {
        return res.status(400).json({
            message: "Combo ID is required"
        });
    }

    try {
        const combo = await getComboById(Number(comboId), userId);
        return res.status(200).json(combo);
    } catch (error) {
        if (error.response) {
            return res.status(error.statusCode || 500).json({
                message: error.response.data.message
            });
        }
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}


export const getAllMenuItemsController = async (req, res) => {
    try {
        const userId = req.headers["x-user-id"];


        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }


        const items = await getAllMenuItems();
        return res.status(200).json(items);
    } catch (error) {
        if (error.response) {
            return res.status(error.statusCode || 500).json({
                message: error.response.data.message
            });
        }
        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}