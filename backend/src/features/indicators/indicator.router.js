// src/features/indicators/indicator.router.js
// IMPORT MODULES.
import express from 'express';
import { verifyToken } from '../../middlewares/verifyToken.js';
import { isAdmin } from '../../middlewares/checkRole.js';

import { createTopic, createIndicator, getTopicsWithIndicators, deleteTopic, deleteIndicator } from './indicator.controller.js';
// INITIALIZE ROUTER.
const router = express.Router();

// ROUTES.
router.get('/period/:id', verifyToken, getTopicsWithIndicators);
router.post('/topics', verifyToken, isAdmin, createTopic);
router.post('/', verifyToken, isAdmin, createIndicator);
router.delete('/topics/:id', verifyToken, isAdmin, deleteTopic);
router.delete('/:id', verifyToken, isAdmin, deleteIndicator);

// EXPORT ROUTER.
export default router;