// src/features/reports/report.controller.js
import { 
    getOverallStatisticsService,
    getProgressService,
    getEvaluationResultService,
    exportEvaluationService
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

// EXPORT EVALUATION.
export const exportEvaluation = async (req, res) => {
    try {
        const { periodId } = req.params;
        const evaluateeId = req.query.evaluateeId || req.user.user_id;

        if (!periodId) {
            return res.status(400).json({
                status: "error",
                code: "MISSING_PARAMETER",
                message: "periodId is required."
            });
        }

        const rows = await exportEvaluationService(evaluateeId, periodId);

        // สร้าง CSV
        const header = 'Topic,Indicator,Description,Weight,EvalType,DataContent,SelfScore,EvaluatorScore,EvaluatorComment,EvaluatorName';
        const csvRows = rows.map(r => 
            `"${(r.topic_name || '').replace(/"/g, '""')}","${(r.indicator_name || '').replace(/"/g, '""')}","${(r.indicator_description || '').replace(/"/g, '""')}",${r.weight},"${r.eval_type}","${(r.data_content || '').replace(/"/g, '""')}",${r.self_score},${r.evaluator_score},"${(r.evaluator_comment || '').replace(/"/g, '""')}","${(r.evaluator_name || '').replace(/"/g, '""')}"`
        );
        const csv = [header, ...csvRows].join('\n');

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="evaluation_export_${periodId}.csv"`);
        return res.status(200).send('\uFEFF' + csv);

    } catch (error) {
        console.error("System Error in exportEvaluation: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to export evaluation data."
        });
    }
};