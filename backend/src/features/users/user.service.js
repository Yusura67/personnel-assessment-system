// src/features/users/user.service.js
// IMPORT MODULE.
import { pool } from '../../config/db.js';

// MAIN BUSINESS LOGIC.

// GET ALL USERS.
export const getAllUsersService = async (role) => {
    let query = 'SELECT user_id, username, fullname, email, role, created_at, updated_at FROM users ';
    const params = [];

    if (role) {
        query += 'WHERE role = ? ';
        params.push(role);
    }

    query += 'ORDER BY created_at DESC';

    const [ rows ] = await pool.query(query, params);
    return rows;
};