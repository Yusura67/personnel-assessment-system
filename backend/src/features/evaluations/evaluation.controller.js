// src/features/evaluations/evaluation.controller.js
// IMPORT MODULE.
import { saveSelfAssessmentService, saveEvaluatorScoreService } from "./evaluation.service.js";

// SAVE SELF ASSIGNMENT.
export const saveSelfAssessment = async (req, res) => {
    try {
        // Get data from user.
        const evaluatee_id = req.user.user_id;
        const { indicator_id, data_content, self_score } = req.body;

        if (!indicator_id || !data_content || self_score === undefined) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "indicator_id, data_content and self_score is required."
            });
        }

        // Process. 
        const result = await saveSelfAssessmentService({
            evaluatee_id,
            indicator_id,
            data_content,
            self_score
        });

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Slef Assignment is Saved!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save self assessment."
        });
    }
};

// SAVE EVALUATOR SCORE.
export const saveEvaluatorScore = async (req, res) => {
    try {
        // Get data from user.
        const { assignment_id, indicator_id, score } = req.body;

        if (!assignment_id || !indicator_id || score === undefined) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "assignment_id, indicator_id and score is required."
            });
        }

        // Process.
        const result = await saveEvaluatorScoreService(req.body);

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Evaluator Score is Saved!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save evaluator score."
        });
    }
};