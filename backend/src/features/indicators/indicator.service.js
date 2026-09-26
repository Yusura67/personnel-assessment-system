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
export const createIndicatorService = async (indicatorData) => {
    const { indicator_name, description, weight, eval_type, period_id, topic_id } = indicatorData;

    const [ result ] = await pool.query(
        'INSERT INTO indicator(indicator_name, description, weight, eval_type, period_id, topic_id) VALUES (?, ?, ?, ?, ?, ?)',
        [ indicator_name, description || null, weight, eval_type, period_id, topic_id ]
    );
    return {
        indicator_id: result.insertId,
        indicator_name,
        description: description || null,
        weight,
        eval_type,
        period_id,
        topic_id
    };
};

// GET TOPICS WITH INDICATORS.
export const getTopicWithIndicatorsService = async (periodId) => {
    const [ topics ] = await pool.query(
        'SELECT * FROM topic WHERE period_id = ? ORDER BY topic_id ASC',
        [ periodId ]
    );

    const [ indicators ] = await pool.query(
        'SELECT * FROM indicators WHERE period_id = ? ORDER BY indicator_id ASC',
        [ periodId ]
    );

    const groupedData = topics.map(topic => {
        return {
            ...topic,
            indicators: indicators.filter(ind => ind.topic_id === topic.topic_id)
        };
    });
    return groupedData;
};

// DELETE TOPIC.
// DELETE INDICATOR.