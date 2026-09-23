// src/features/auth/auth.validator.js
// IMPORT MODULES.
import { body, validationResult } from 'express-validator';

// RESERVED WORDS.
const reservedWords = new Set(['admin', 'administrator', 'staff', 'support', 'help', 'root']);

// HANDLE VALIDATION ERROR.
const handleValidationErrors = (code, message) => (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => err.msg);
        return res.status(400).json({
            status: "error",
            code: code,
            message: message,
            errors: formattedErrors
        });
    }
    next();
}

// VALIDATION REGISTER.
export const validationRegister = [
    body('username')
        .trim()
        .notEmpty().withMessage("Username is required.")
        .isString().withMessage("Username must be string only.")
        .isLength({ min: 3, max: 64 }).withMessage("Username must be between 3 and 64 characters.")
        .matches(/^[a-zA-Z0-9._-]+$/).withMessage("Username must be a-z A-Z 0-9 and . _ - only.")
        .custom((value) => {
            if (reservedWords.has(value.toLowerCase())) {
                throw new Error("This username is a reserved word.");
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage("Password is required.")
        .isString().withMessage("Password must be string only.")
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters."),

    body('fullname')
        .trim()
        .notEmpty().withMessage("Fullname is required.")
        .isString().withMessage("Fullname must be string only.")
        .isLength({ min: 1, max: 64 }).withMessage("Fullname must be between 1 and 64 characters."),

    body('email')
        .trim()
        .notEmpty().withMessage("Email is required.")
        .isString().withMessage("Email must be string only.")
        .isLength({ min: 1, max: 100 }).withMessage("Email must be between 1 and 100 characters.")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    handleValidationErrors("REGISTER_FAILED", "Register_failed")
];

// VALIDATION LOGIN.
export const validationLogin = [
    body('username')
        .trim()
        .notEmpty().withMessage("Username is required.")
        .isString().withMessage("Username must be string only.")
        .isLength({ min: 3, max: 64 }).withMessage("Username must be between 3 and 64 characters."),

    body('password')
        .notEmpty().withMessage("Password is required.")
        .isString().withMessage("Password must be string only.")
        .isLength({ min: 8, max: 64 }).withMessage("Password must be between 8 and 64 characters."),

    handleValidationErrors("LOGIN_FAILED", "Login_failed")
];