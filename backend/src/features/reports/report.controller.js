// src/features/reports/report.controller.js
import { 
    getOverallStatisticsService,
    getProgressService,
    getEvaluationResultService
} from './report.service.js';

// GET OVERALL STATISTICS.
export const getOverallStatistics = async (req, res) => {
    try {
        const { periodId } = req.params;

        if (!periodId) {
            return res.status(400).json({
                status: "error",
                code: "MISSING_PARAMETER",
                message: "periodId is required."
            });
        }

        const result = await getOverallStatisticsService(periodId);

        return res.status(200).json({
            status: "success",
            message: "Overall statistics fetched successfully.",
            data: result
        });
    } catch (error) {
        console.error("System Error in getOverallStatistics: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch statistics."
        });
    }
};

// GET PROGRESS.
export const getProgress = async (req, res) => {
    try {
        const { periodId } = req.params;
        const evaluateeId = req.query.evaluateeId;
        const evaluatorId = req.query.evaluatorId;

        if (!periodId) {
            return res.status(400).json({
                status: "error",
                code: "MISSING_PARAMETER",
                message: "periodId is required."
            });
        }

        const result = await getProgressService(periodId, evaluateeId, evaluatorId);

        return res.status(200).json({
            status: "success",
            message: "Progress fetched successfully.",
            data: result
        });
    } catch (error) {
        console.error("System Error in getProgress: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch progress."
        });
    }
};

// GET EVALUATION RESULT.
export const getEvaluationResult = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        if (!assignmentId) {
            return res.status(400).json({
                status: "error",
                code: "MISSING_PARAMETER",
                message: "assignmentId is required."
            });
        }

        const result = await getEvaluationResultService(assignmentId);

        return res.status(200).json({
            status: "success",
            message: "Evaluation results fetched successfully.",
            data: result
        });
    } catch (error) {
        console.error("System Error in getEvaluationResult: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch evaluation result."
        });
    }
};
