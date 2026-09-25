// src/features/indicators/indicator.service.js
// IMPORT MODULE.
import { pool } from '../../config/db.js';

// MAIN BUSINESS LOGIC.

// CREATE TOPIC.
export const createTopicService = async (topicData) => {
    const { topic_name , period_id } = topicData;

    const [ result ] = await pool.query(
        'INSERT INTO topic(topic_name , period_id) VALUES(?, ?)',
        [ topic_name, period_id ]
    );
    return {
        topic_id: result.insertId,
        topic_name,
        period_id
    };
};

// CRATE INDICATOR.
// GET TOPICS WITH INDICATORS.
// DELETE TOPIC.
// DELETE INDICATOR.