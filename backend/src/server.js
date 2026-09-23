// src/server.js
// IMPORT MODULES.
import express from 'express';
import cors from 'cors';
import { CONFIG } from './config/env.js';
import { checkConnection } from './config/db.js';

// IMPORT MIDDLEWARES.
import { globalErrorHandler } from './middlewares/errorHandler.js';

// IMPORT ROUTES.
import authRoutes from './features/auth/auth.route.js';

// CONFIGURATION & VARIABLE.
const app = express();
const PORT = CONFIG.PORT;

// MIDDLEWARES.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES.
app.use('/api/auth', authRoutes);
// app.use('/api/periods', periodRoutes);
// app.use('/api/indicators', indicatorRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/assignments', assignmentRoutes);
// app.use('/api/evaluations', evaluationRoutes);
// app.use('/api/uploads', uploadRoutes);
// app.use('/api/reports', reportRoutes);

// ERROR HANDLER.
app.use(globalErrorHandler);

// START SERVER.
await checkConnection();
app.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT);
});