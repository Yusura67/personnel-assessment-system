// src/config/env.js
// IMPORT MODULE.
import dotenv from 'dotenv';
dotenv.config();

// VALIDATION ENVIRONMENT VARIABLE.
const requiredEnv = [ 'PORT', 'JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME' ]
const missingEnv = [];

for (const key of requiredEnv) {
    if (!process.env[key]) {
        missingEnv.push(key);
    }
}

if (missingEnv.length > 0) {
    console.error(missingEnv.join(" "), " isn't in the .env file");
    process.exit(1);
}

const rawConfig = {
    PORT: Number(process.env.PORT),
    JWT_SECRET: process.env.JWT_SECRET,

    DATABASE: Object.freeze({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        dateStrings: true
    })
};

// EXPORT CONFIG READ-ONLY.
export const CONFIG = Object.freeze(rawConfig);