// src/features/uploads/upload.route.js
// IMPORT MODULES.
import express from 'express';
import { upload } from '../../middlewares/upload.js';
import { verifyToken } from '../../middlewares/verifyToken.js';

import { uploadFile } from './upload.controller.js';

// INITIALIZE ROUTER.
const router = express.Router();

// ROUTES.
router.post('/', verifyToken, upload.single('file'), uploadFile);

// EXPORT ROUTER.
export default router;