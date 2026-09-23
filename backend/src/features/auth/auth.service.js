// src/features/auth/auth.service.js
// IMPORT MODULES.
import { pool } from '../../config/db.js';
import { CONFIG } from '../../config/env.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// MAIN BUSINESS LOGIC.

// REGISTER LOGIC.
export const registerService = async (username, password, fullname, email) => {
    // Check User Duplicate.
    const [ rows ] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [ username ]
    );

    if (rows.length > 0) {
        throw new Error("USER_DUPLICATE");
    }

    // Hashed Password.
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);
    
    // Insert data into database.
    const [ result ] = await pool.query(
        'INSERT INTO users(username, password, fullname, email) VALUES(?, ?, ?, ?)',
        [ username, hashedPassword, fullname, email ]
    );

    // Return Result.
    return result;
};

// LOGIC LOGIC.
export const loginService = async (username, password) => {
    // Check user in the database.
    const [ rows ] = await pool.query(
        'SELECT * FROM users WHERE username = ?',
        [ username ]
    );
    const user = rows[0];

    if (rows.length === 0) {
        throw new Error("USER_NOT_FOUND");
    }

    // Compare Password.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("INVALID_PASSWORD");
    }

    // Payload.
    const payload = {
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        email: user.email
    };

    // Create token.
    const secretKey = CONFIG.JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    // Return Token.
    return {
        token,
        user: payload
    };
};