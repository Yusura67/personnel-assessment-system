// src/features/evaluations/evaluation.route.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin, isEvaluatee, isEvaluator } from '../../middlewares/checkRole.js';

import { saveSelfAssessment, saveEvaluatorScore } from './evaluation.controller.js';
// INITIALIZE ROUTER.
const router = express.Router();

// ROUTES.
router.post('/self-assessments', verifyToken, isEvaluatee, saveSelfAssessment);
router.post('/score', verifyToken, isEvaluator, saveEvaluatorScore);
// router.post('/sign', verifyToken, isEvaluator, signEvaluation);
// router.put('/cancle-sign/:id', verifyToken, isEvaluator, cancleSignature);
// router.get('/self-assessments/:evaluateeId/period/:periodId', verifyToken, getSelfAssessmentDetail);

// EXPORT ROUTER.
export default router;