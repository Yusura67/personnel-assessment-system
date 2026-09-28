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