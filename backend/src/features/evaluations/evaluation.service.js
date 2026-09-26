// src/features/evaluations/evaluation.service.js
// IMPORT MODULE.
import { pool } from '../../config/db.js';

// MAIN BUSINESS LOGIC.

// SAVE SELF ASSESSMENT.
export const saveSelfAssessmentService = async (assessmentData) => {
    const { evaluatee_id, indicator_id, data_content, self_score } = assessmentData;

    const [ exists ] = await pool.query(
        'SELECT data_id FROM evaluatee_data WHERE evaluatee_id = ? AND indicator_id = ?',
        [ evaluatee_id, indicator_id ]
    );

    if (exists.length > 0) {
        const user = exists[0];
        await pool.query(
            "UPDATE evaluatee_data SET data_content = ?, self_score = ? WHERE data_id = ?",
            [ data_content, self_score, user.data_id ]
        );
        return { data_id: user.data_id, ...assessmentData };

    } else {
        const [ result ] = await pool.query(
            "INSERT INTO evaluatee_data(evaluatee_id, indicator_id, data_content, self_score) VALUES(?, ?, ?, ?)",
            [ evaluatee_id, indicator_id, data_content, self_score ]
        );
        return { data_id: result.insertId, ...assessmentData };
    }
};

// SAVE EVALUATOR SCORE.
// SIGN EVALUATION.
// CANCLE SIGNATURE.
// GET SELF ASSIGNMENT DEAIL.