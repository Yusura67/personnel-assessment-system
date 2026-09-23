// src/features/auth/auth.route.js
// IMPORT MODULES.
import express from 'express';
import { register, login } from "./auth.controller.js";
import { validationRegister, validationLogin } from './auth.validator.js';

// INITIALIZATION ROUTER.
const router = express.Router();

// ROUTES.
router.post('/register', validationRegister, register);
router.post('/login', validationLogin, login);

// EXPORT ROUTER.
export default router;