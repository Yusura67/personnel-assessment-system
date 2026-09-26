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
export const saveEvaluatorScoreService = async (scoreData) => {
    const { assignment_id, indicator_id, score, comment } = scoreData;

    const [ exists ] = await pool.query(
        'SELECT score_id FROM score WHERE assignment_id = ? AND indicator_id = ?',
        [ assignment_id, indicator_id ]
    );

    if (exists.length > 0) {
        const scoreE = exists[0];
        await pool.query(
            "UPDATE score SET score = ?, comment = ? WHERE score_id = ?",
            [ score, comment || null, scoreE.score_id ]
        );
        return { score_id: scoreE.score_id, ...scoreData }
    } else {
        const [ result ] = await pool.query(
            'INSERT INTO score(assignment_id, indicator_id, score, comment) VALUES(?, ?, ?, ?)',
            [ assignment_id, indicator_id, score, comment ]
        );

        await pool.query(
            "UPDATE assignment SET status = 'evaluating' WHERE assignment_id = ?",
            [ assignment_id ]
        );

        return { score_id: result.insertId, ...scoreData };
    }
};

// SIGN EVALUATION.
// CANCLE SIGNATURE.
// GET SELF ASSIGNMENT DEAIL.