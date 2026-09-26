// src/features/users/user.route.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin } from '../../middlewares/checkRole.js';

import { getAllUsers } from './user.controller.js';

// INITIALIZE ROUTER.
const router = express.Router();

// ROUTES.
router.get('/', verifyToken, isAdmin, getAllUsers);
// router.put('/:id', verifyToken, isAdmin, updateUser);
// router.delete('/:id', verifyToken, isAdmin, deleteUser);

// EXPORT ROUTER.
export default router;