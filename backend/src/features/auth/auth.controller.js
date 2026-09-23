// src/features/auth/auth.controller.js
// IMPORT MOUDLE.
import { registerService, loginService } from "./auth.service.js";

// REGISTER.
export const register = async (req, res) => {
    try {
        // Get data from user.
        const { username, password, fullname, email }= req.body;

        if (!username || typeof username !== 'string' || !password || typeof password !== 'string' || !fullname || typeof fullname !== 'string' || !email || typeof email !== 'string') {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "Username, password, fullname and email is required."
            });
        }
        const clearUser = username && username.trim();
        const clearFull = fullname && fullname.trim();
        const clearEmail = email && email.trim();        

        // Process.
        const result = await registerService(clearUser, password, clearFull, clearEmail);

        // Return Result.
        return res.status(201).json({
            status: "success",
            message: "Register Successfully!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        if (error instanceof Error) {
            if (error.message === 'USER_DUPLICATE') {
                return res.status(409).json({
                    status: "error",
                    code: "USER_DUPLICATE",
                    message: "This user is already exists."
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

// LOGIN.
export const login = async (req, res) => {
    try {
        // Get data from user.
        const { username, password }= req.body;

        if (!username || typeof username !== 'string' || !password || typeof password !== 'string') {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "Username and password is required."
            });
        }
        const clearUser = username && username.trim();

        // Process.
        const result = await loginService(clearUser, password);

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Login Successfully!",
            data: {
                token: result.token,
                user: result.user
            }
        })

    } catch(error) {
        // ERROR HANDLING.
        if (error instanceof Error) {
            if (error.message === 'USER_NOT_FOUND' || error.message === 'INVALID_PASSWORD') {
                return res.status(401).json({
                    status: "error",
                    code: "INVALID_CREDENTIALS",
                    message: "Invalid username or password."
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