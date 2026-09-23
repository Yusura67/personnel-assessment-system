// src/server.js
// IMPORT MODULES.
import express from 'express';
import cors from 'cors';
import { CONFIG } from './config/env.js';
import { checkConnection } from './config/db.js';

// IMPORT ROUTES.


// CONFIGURATION & VARIABLE.
const app = express();
const PORT = CONFIG.PORT;

// MIDDLEWARES.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES.


// START SERVER.
await checkConnection();
app.listen(PORT, () => {
    console.log("Server is running on PORT " + PORT);
});