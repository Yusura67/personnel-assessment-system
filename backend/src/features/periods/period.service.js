// src/features/periods/period.service.js
// IMPORT MOUDLE.
import { pool } from '../../config/db.js';

// MAIN BUSINESS LOGIC.

// GET ALL PERIODS.
export const getAllPeriodsService = async () => {
    const [ rows ] = await pool.query(
        'SELECT * FROM evaluation_period ORDER BY period_id DESC',
    );
    return rows;
}

// GET PERIOD BY ID.
export const getPeriodByIdService = async (periodId) => {
    const [ rows ] = await pool.query(
        'SELECT * FROM evaluation_period WHERE period_id = ?',
        [ periodId ]
    );
    return rows[0] || null;
};

// CREATE PERIOD.
export const createPeriodService = async (periodData) => {
    const { period_name, start_date, end_date, status = 'closed' } = periodData;

    const [ result ] = await pool.query(
        'INSERT INTO evaluation_period(period_name, start_date, end_date, status) VALUES(?, ?, ?, ?)',
        [ period_name, start_date, end_date, status ]
    );
    return {
        period_id: result.insertId,
        period_name,
        start_date,
        end_date,
        status
    };
};

// UPDATE PERIOD.
// GET ACTIVE PERIOD.
// DELETE PERIOD.