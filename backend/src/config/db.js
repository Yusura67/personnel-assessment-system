// src/config/db.js
// IMPORT MODULES.
import mysql from 'mysql2/promise';
import { CONFIG } from './env.js';

// CONNECTION DATABASE.
export const pool = mysql.createPool(CONFIG.DATABASE);

// CONNECTION TESTING.
export const checkConnection = async () => {
    try {
        await pool.query('SELECT 1');
        console.log("Database Connection Successfully!");
    } catch(error) {
        console.error("Database connection failed.");
        console.error("CRITICAL ERROR: ", error);
        process.exit(1);
    }
};