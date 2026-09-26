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
    const { period_name, start_date, end_date } = periodData;

    const [ result ] = await pool.query(
        'INSERT INTO evaluation_period(period_name, start_date, end_date, status) VALUES(?, ?, ?, ?)',
        [ period_name, start_date, end_date, 'closed' ]
    );
    return {
        period_id: result.insertId,
        period_name,
        start_date,
        end_date,
        status: 'closed'
    };
};

// UPDATE PERIOD.
export const updatePeriodService = async (periodId, periodData) => {
    const { period_name, start_date, end_date, status } = periodData;

    const [ result ] = await pool.query(
        "UPDATE evaluation_period SET period_name = ?, start_date = ?, end_date = ?, status = ? WHERE period_id = ?",
        [ period_name, start_date, end_date, status, periodId ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return {
        period_id: periodId,
        period_name,
        start_date,
        end_date,
        status
    };
};

// GET ACTIVE PERIOD.
export const getActivePeriodService = async () => {
    const [ rows ] = await pool.query(
        "SELECT * FROM evaluation_period WHERE status = 'active' AND CURDATE() BETWEEN start_date AND end_date"
    );
    return rows;
};

// DELETE PERIOD.
export const deletePeriodService = async (periodId) => {
    const [ result ] = await pool.query(
        'DELETE FROM evaluation_period WHERE period_id = ?',
        [ periodId ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return result;
};