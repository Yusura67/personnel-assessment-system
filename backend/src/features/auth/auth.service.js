// src/features/auth/auth.service.js
// IMPORT MODULES.
import { pool } from '../../config/db.js';
import { CONFIG } from '../../config/env.js';
import bcrypt, { hash } from 'bcrypt';
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

// CHANGE PASSWORD LOGIC.
export const changePasswordService = async (userId, oldPassword, newPassword) => {
    // Check user exists.
    const [ rows ] = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [ userId ]
    );
    const user = rows[0];

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // Compare old password.
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
        throw new Error("INVALID_PASSWORD");
    }

    // Hash newPassword with bcrypt.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // UPDATE password.
    await pool.query(
        "UPDATE users SET password = ?, must_change_password = 0 WHERE user_id = ?",
        [ hashedPassword, userId ]
    );

    // RETURN RESULT.
    return { user_id: userId };
};