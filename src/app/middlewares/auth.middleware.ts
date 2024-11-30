import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/app.config";
import { JwtPayload } from "../../types/auth.interface";


// Middleware to check if user is authenticated / has valid token in place
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
):void | Promise<void> => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.authUser = decoded;
        next();
    } catch (error){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};