// src/features/auth/auth.route.js
// IMPORT MODULES.
import express from 'express';
import { register, login, changePassword } from "./auth.controller.js";
import { validationRegister, validationLogin } from './auth.validator.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

// INITIALIZATION ROUTER.
const router = express.Router();

// ROUTES.
router.post('/register', validationRegister, register);
router.post('/login', validationLogin, login);
router.post('/change-password', verifyToken, changePassword);

// EXPORT ROUTER.
export default router;