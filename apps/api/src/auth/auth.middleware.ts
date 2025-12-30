import { verifyAccessToken } from "@repo/auth";
import { Request, Response, NextFunction } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }
        const verifyToken = verifyAccessToken(token)
        if (!verifyToken) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            error: error
        })
    }
}