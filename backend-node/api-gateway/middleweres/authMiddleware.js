import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies.accessToken;

        if (!token) {
            throw new Error("Unauthorized");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}