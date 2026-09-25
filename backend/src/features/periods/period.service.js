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
// CREATE PERIOD.
// UPDATE PERIOD.
// GET ACTIVE PERIOD.
// DELETE PERIOD.