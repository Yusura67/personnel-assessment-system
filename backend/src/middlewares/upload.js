// src/middlewares/upload.js
// IMPORT MODULES.
import multer from 'multer';
import path from 'path';

// STORAGE CONFIGURATION.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const uniqeSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '_' + uniqeSuffix + ext);
    }
});

// FILE FILTER.
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [ 'image/jpeg', 'image/png', 'image/webp', 'application/pdf' ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("INVALID_FILE_TYPE"), false);
    }
};

// EXPORT UPLOAD.
export const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB.
    fileFilter: fileFilter
});