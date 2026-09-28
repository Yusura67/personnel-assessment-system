// src/features/reports/report.route.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin } from '../../middlewares/checkRole.js';

import { 
    getOverallStatistics,
    getProgress,
    getEvaluationResult,
    exportEvaluation,
    getIndividualReport
} from './report.controller.js';

// INITIALIZATION ROUTER.
const router = express.Router();

// ROUTES.
router.get('/statistics/period/:periodId', verifyToken, isAdmin, getOverallStatistics);
router.get('/progress/period/:periodId', verifyToken, getProgress);
router.get('/results/assignment/:assignmentId', verifyToken, getEvaluationResult);
router.get('/individual/:evaluateeId/period/:periodId', verifyToken, isAdmin, getIndividualReport);
router.get('/export/period/:periodId', verifyToken, exportEvaluation);

// EXPORT ROUTER.
export default router;