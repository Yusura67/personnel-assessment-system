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