// src/features/reports/report.service.js
import { pool } from '../../config/db.js';

// BUSINESS LOGIC.

// GET OVERALL STATISTICS.
export const getOverallStatisticsService = async (periodId) => {
    const [rows] = await pool.query(
        `SELECT 
            a.evaluatee_id, 
            u.fullname AS evaluatee_name, 
            COUNT(s.score_id) AS total_evaluated_items,
            ROUND(SUM(s.score * i.weight) / NULLIF(SUM(i.weight), 0), 2) AS weighted_average_score
         FROM assignment a
         JOIN users u ON a.evaluatee_id = u.user_id
         LEFT JOIN score s ON a.assignment_id = s.assignment_id
         LEFT JOIN indicator i ON s.indicator_id = i.indicator_id
         WHERE a.period_id = ? AND a.status = 'completed'
         GROUP BY a.evaluatee_id, u.fullname`,
        [periodId]
    );
    return rows;
};

// GET PROGRESS.
export const getProgressService = async (periodId, evaluateeId, evaluatorId) => {
    let query = `
        SELECT 
            a.assignment_id,
            a.evaluatee_id,
            a.evaluator_id,
            a.status,
            a.role AS evaluator_role,
            e.fullname AS evaluator_name,
            ee.fullname AS evaluatee_name
        FROM assignment a
        JOIN users e ON a.evaluator_id = e.user_id
        JOIN users ee ON a.evaluatee_id = ee.user_id
        WHERE a.period_id = ?
    `;
    const params = [periodId];

    if (evaluateeId) {
        query += ` AND a.evaluatee_id = ?`;
        params.push(evaluateeId);
    }

    if (evaluatorId) {
        query += ` AND a.evaluator_id = ?`;
        params.push(evaluatorId);
    }

    query += ` ORDER BY a.assignment_id DESC`;

    const [rows] = await pool.query(query, params);
    return rows;
};

// GET EVALUATION RESULT.
export const getEvaluationResultService = async (assignmentId) => {
    const [rows] = await pool.query(
        `SELECT 
            s.score_id,
            i.indicator_name,
            s.score,
            s.comment
         FROM score s
         JOIN indicator i ON s.indicator_id = i.indicator_id
         WHERE s.assignment_id = ?`,
        [assignmentId]
    );
    return rows;
};

// EXPORT EVALUATION.
export const exportEvaluationService = async (evaluateeId, periodId) => {
    const [rows] = await pool.query(
        `SELECT 
            t.topic_name,
            i.indicator_name,
            i.description AS indicator_description,
            i.weight,
            i.eval_type,
            COALESCE(ed.data_content, '') AS data_content,
            COALESCE(ed.self_score, 0) AS self_score,
            COALESCE(s.score, 0) AS evaluator_score,
            COALESCE(s.comment, '') AS evaluator_comment,
            COALESCE(u.fullname, '') AS evaluator_name
         FROM indicator i
         JOIN topic t ON i.topic_id = t.topic_id
         LEFT JOIN evaluatee_data ed ON i.indicator_id = ed.indicator_id AND ed.evaluatee_id = ?
         LEFT JOIN assignment a ON a.evaluatee_id = ? AND a.period_id = i.period_id AND a.status = 'completed'
         LEFT JOIN score s ON s.assignment_id = a.assignment_id AND s.indicator_id = i.indicator_id
         LEFT JOIN users u ON a.evaluator_id = u.user_id
         WHERE i.period_id = ?
         ORDER BY t.topic_id, i.indicator_id`,
        [evaluateeId, evaluateeId, periodId]
    );
    return rows;
};

// GET INDIVIDUAL REPORT.
export const getIndividualReportService = async (evaluateeId, periodId) => {
    const [userRows] = await pool.query(
        `SELECT user_id, username, fullname, email, role FROM users WHERE user_id = ?`,
        [evaluateeId]
    );

    const [indicatorRows] = await pool.query(
        `SELECT 
            t.topic_name,
            i.indicator_id,
            i.indicator_name,
            i.description,
            i.weight,
            i.eval_type,
            COALESCE(ed.data_content, '') AS self_data_content,
            COALESCE(ed.self_score, 0) AS self_score,
            ROUND(AVG(s.score), 2) AS avg_evaluator_score,
            COUNT(DISTINCT a.assignment_id) AS evaluator_count
         FROM indicator i
         JOIN topic t ON i.topic_id = t.topic_id
         LEFT JOIN evaluatee_data ed ON i.indicator_id = ed.indicator_id AND ed.evaluatee_id = ?
         LEFT JOIN assignment a ON a.evaluatee_id = ? AND a.period_id = ? AND a.status = 'completed'
         LEFT JOIN score s ON s.assignment_id = a.assignment_id AND s.indicator_id = i.indicator_id
         WHERE i.period_id = ?
         GROUP BY t.topic_name, i.indicator_id, i.indicator_name, i.description, i.weight, i.eval_type, ed.data_content, ed.self_score
         ORDER BY t.topic_id, i.indicator_id`,
        [evaluateeId, evaluateeId, periodId, periodId]
    );

    const [evaluatorRows] = await pool.query(
        `SELECT 
            a.assignment_id,
            a.role AS evaluator_role,
            a.status,
            a.overall_comment,
            a.signature_path,
            u.fullname AS evaluator_name,
            ROUND(SUM(s.score * i.weight) / NULLIF(SUM(i.weight), 0), 2) AS weighted_average_score,
            COUNT(s.score_id) AS total_scored_items
         FROM assignment a
         JOIN users u ON a.evaluator_id = u.user_id
         LEFT JOIN score s ON a.assignment_id = s.assignment_id
         LEFT JOIN indicator i ON s.indicator_id = i.indicator_id
         WHERE a.evaluatee_id = ? AND a.period_id = ?
         GROUP BY a.assignment_id, a.role, a.status, a.overall_comment, a.signature_path, u.fullname
         ORDER BY a.assignment_id`,
        [evaluateeId, periodId]
    );

    const totalWeightedAvg = evaluatorRows.length > 0
        ? (evaluatorRows.reduce((sum, r) => sum + (parseFloat(r.weighted_average_score) || 0), 0) / evaluatorRows.length).toFixed(2)
        : 0;

    return {
        evaluatee: userRows[0] || null,
        period_id: periodId,
        summary: {
            total_evaluators: evaluatorRows.length,
            completed_evaluators: evaluatorRows.filter(r => r.status === 'completed').length,
            overall_weighted_average: parseFloat(totalWeightedAvg)
        },
        indicators: indicatorRows,
        evaluators: evaluatorRows
    };
};