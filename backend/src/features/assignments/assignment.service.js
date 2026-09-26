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
// REQUEST RE EVALUATION.
// DELETE ASSIGNMENT.