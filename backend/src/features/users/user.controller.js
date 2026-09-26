// src/features/users/user.controller.js
// IMPORT MODULE.
import { getAllUsersService, updateUserService, deleteUserService } from "./user.service.js"

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

// UPDATE USER.
export const updateUser = async (req, res) => {
    try {
        // Get data from user.
        const userId = req.params.id
        const { fullname, email, role } = req.body;

        // Validate.
        if (!fullname || !email || !role) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "Fullname, email and role is required."
            });
        }

        // Process.
        const result = await updateUserService(userId, req.body);

        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "USER_NOT_FOUND",
                message: "user not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "User is Updated!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update user."
        });
    }
};

// DELETE USER.
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Process.
        const result = await deleteUserService(userId);

        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "USER_NOT_FOUND",
                message: "user not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "user was deleted!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete user."
        });
    }
}