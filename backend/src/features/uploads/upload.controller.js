// src/features/uploads/upload.controller.js

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                code: "FILE_MISSING",
                message: "Please upload a file."
            });
        }

        const filePath = '/uploads/' + req.file.filename;

        return res.status(201).json({
            status: "success",
            message: "File uploaded successfully!",
            data: {
                file_path: filePath,
                original_name: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
  
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to upload file."
        });
    }
};