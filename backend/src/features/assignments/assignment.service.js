// src/features/assignment/assignment.service.js
// IMPORT MODULE.
import { pool } from '../../config/db.js';

// MAIN BUSINESS LOGIC.

// CREATE ASSIGNMENT.
export const createAssignmentService = async (assignmentData) => {
    const { evaluator_id, evaluatee_id, period_id, role } = assignmentData;

    const [ result ] = await pool.query(
        'INSERT INTO assignment(evaluator_id, evaluatee_id, period_id, role) VALUES(?, ?, ?, ?)',
        [ evaluator_id, evaluatee_id, period_id, role ]
    );
    return {
        assignment_id: result.insertId,
        evaluator_id,
        evaluatee_id,
        period_id,
        role
    };
};

// GET ASSIGNMENT BY PERIOD.
export const getAssignmentByPeriodService = async (periodId) => {
    const [ rows ] = await pool.query(
        'SELECT a.assignment_id, a.role, a.status, ' +
        'er.fullname AS evaluator_name, ' +
        'ee.fullname AS evaluatee_name ' +
        'FROM assignment a ' +
        'JOIN users er ON a.evaluator_id = er.user_id ' +
        'JOIN users ee ON a.evaluatee_id = ee.user_id ' +
        'WHERE a.period_id = ? ORDER BY a.assignment_id DESC',
        [ periodId ]
    );
    return rows;
};

// GET MY EVALUATEE.
export const getMyEvaluateeService = async (evaluatorId, periodId) => {
    const [ rows ] = await pool.query(
        'SELECT a.assignment_id, a.evaluatee_id, a.status, ' +
        'u.fullname AS evaluatee_name, ' +
        'COALESCE(SUM(ed.self_score), 0) AS total_self_score, ' +
        'COUNT(ed.data_id) AS submitted_count ' +
        'FROM assignment a ' +
        'JOIN users u ON a.evaluatee_id = u.user_id ' +
        'LEFT JOIN evaluatee_data ed ON a.evaluatee_id = ed.evaluatee_id ' +
        'WHERE a.evaluator_id = ? AND a.period_id = ? ' +
        'GROUP BY a.assignment_id, a.evaluatee_id, a.status, u.fullname, u.email ' +
        'ORDER BY a.assignment_id DESC',
        [ evaluatorId, periodId ]
    );
    return rows;
};

// REQUEST RE EVALUATION.
export const requestReEvaluationService = async (assignmentId, evaluateeId) => {
    const [ result ] = await pool.query(
        "UPDATE assignment SET status = 're_evaluate_requested' WHERE assignment_id = ? AND evaluatee_id = ?",
        [ assignmentId, evaluateeId ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        assignment_id: assignmentId,
        evaluatee_id: evaluateeId,
        status: 're_evaluate_requested'
    };
};

// DELETE ASSIGNMENT.