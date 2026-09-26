// src/features/assignments/assignment.controller.js
// IMPORT MODULE.
import { createAssignmentService } from "./assignment.service.js";

// CREATE ASSIGNMENT.
export const createAssignment = async (req, res) => {
    try {
        // Get data from user.
        const { evaluator_id, evaluatee_id, period_id, role } = req.body;

        // Validate.
        if (!evaluator_id || !evaluatee_id || !period_id || !role) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "evaluator_id, evaluatee_id, period_id and role is required."
            });
        }

        // Process.
        const result = await createAssignmentService(req.body);

        // Return Result.
        return res.status(201).json({
            status: "success",
            message: "Assignment is Created!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create assignment."
        });
    }
};