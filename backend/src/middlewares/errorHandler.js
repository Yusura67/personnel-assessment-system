// src/middleware/errorHandler.js

export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: "error",
            code: "BAD_JSON_FORMAT",
            message: "Invalid JSON format sent in the request."
        });
    }

    console.error("GLOBAL SYSTEM ERROR: ", err);
    return res.status(500).json({
        status: "error",
        code: "INTERNAL_SERVER_ERROR",
        message: "Somthing went wrong on the server."
    });
};