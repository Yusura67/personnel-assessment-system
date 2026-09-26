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
// GET MY EVALUATEE.
// REQUEST RE EVALUATION.
// DELETE ASSIGNMENT.