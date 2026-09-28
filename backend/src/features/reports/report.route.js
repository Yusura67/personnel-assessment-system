// src/features/reports/report.route.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin } from '../../middlewares/checkRole.js';

import { 
    getOverallStatistics
} from './report.controller.js';

// INITIALIZATION ROUTER.
const router = express.Router();

// ROUTES.
router.get('/statistics/period/:periodId', verifyToken, isAdmin, getOverallStatistics);

// EXPORT ROUTER.
export default router;