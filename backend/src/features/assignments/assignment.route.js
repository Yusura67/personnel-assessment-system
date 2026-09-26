// src/features/assignments/assignment.route.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin, isEvaluatee, isEvaluator } from '../../middlewares/checkRole.js';

import { createAssignment, getAssignmentByPeriod, getMyEvaluatee, requestReEvaluation } from './assignment.controller.js';
// INITIALIZE ROUTER.
const router = express.Router();

// ROUTES.
router.post('/', verifyToken, isAdmin, createAssignment);
router.get('/period/:id', verifyToken, isAdmin, getAssignmentByPeriod);
router.get('/my-evaluatees/:id', verifyToken, isEvaluator, getMyEvaluatee);
router.put('/:id/re-evaluate', verifyToken, isEvaluatee, requestReEvaluation);
// router.delete('/:id', verifyToken, isAdmin, deleteAssignment);

// EXPORT ROUTER.
export default router;