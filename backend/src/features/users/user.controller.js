// src/features/users/user.controller.js
// IMPORT MODULE.
import { getAllUsersService } from "./user.service.js"

// GET ALL USERS.
export const getAllUsers = async (req, res) => {
    try {
        const role = req.query.role;

        // Process.
        const result = await getAllUsersService(role);

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Users is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get all users."
        });
    }
};