// src/features/assignments/assignment.controller.js
// IMPORT MODULE.
import { createAssignmentService, getAssignmentByPeriodService, getMyEvaluateeService, requestReEvaluationService, deleteAssignmentService } from "./assignment.service.js";

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

// GET ASSIGNMENT BY PERIOD.
export const getAssignmentByPeriod = async (req, res) => {
    try {
        const periodId = req.params.id;

        // Process.
        const result = await getAssignmentByPeriodService(periodId);

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Assignment is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get assignment."
        });
    }
};

// GET MY EVALUATEE.
export const getMyEvaluatee = async (req, res) => {
    try {
        const periodId = req.params.id;
        const evaluatorId = req.user.user_id;

        // Process.
        const result = await getMyEvaluateeService(evaluatorId, periodId);

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Evaluatee is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get evaluatee."
        });
    }
};

// REQUEST RE EVALUATION.
export const requestReEvaluation = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const evaluateeId = req.user.user_id;

        // Process.
        const result = await requestReEvaluationService(assignmentId, evaluateeId);

        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "DATA_NOT_FOUND",
                message: "assignment_id or evaluatee_id not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Request re evaluation!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to request re evaluation."
        });
    }
};

// DELETE ASSIGNMENT.
export const deleteAssignment = async (req, res) => {
    try {
        const assignmentId = req.params.id

        // Process.
        const result = await deleteAssignmentService(assignmentId);

        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "ASSIGNMENT_NOT_FOUND",
                message: "assignment not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "assignment was deleted.",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete assignment."
        });
    }
};