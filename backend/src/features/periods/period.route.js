// src/features/periods/period.route.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin } from '../../middlewares/checkRole.js';

import { getAllPeriods, getPeriodById, createPeriod, updatePeriod, getActivePeriod, deletePeriod } from './period.controller.js';

// INITIALIZE ROUTER.
const router = express.Router();

// ROUTES.
router.get('/active', verifyToken, getActivePeriod);
router.get('/', verifyToken, isAdmin, getAllPeriods);
router.get('/:id', verifyToken, isAdmin, getPeriodById);
router.post('/', verifyToken, isAdmin, createPeriod);
router.put('/:id', verifyToken, isAdmin, updatePeriod);
router.delete('/:id', verifyToken, isAdmin, deletePeriod);

// EXPORT ROUTER.
export default router;