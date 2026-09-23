// src/middlewares/verifyToken.js
// IMPORT MODULES.
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/env.js';

// VERIFY TOKEN MIDDLEWARE.
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Check token.
    if (!token) {
        return res.status(401).json({
            status: "error",
            code: "ACCESS_DENIED",
            message: "No token."
        });
    }

    try {
        // Decoded.
        const secretKey = CONFIG.JWT_SECRET;
        const decoded = jwt.verify(token, secretKey);

        // NextFunction.
        req.user = decoded;
        next();

    } catch(error) {
        // ERROR HANDLING.
        if (error instanceof Error) {
            if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    status: "error",
                    code: "ACCESS_DENIED",
                    message: "Invalid or expired token."
                });
            }
        }

        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong on the server."
        });
    }
};