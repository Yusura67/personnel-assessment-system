// src/middlewares/checkRole.js

// CHECK EVALUATEE.
export const isEvaluatee = async (req, res, next) => {
    if (!req.user || req.user.role !== 'evaluatee') {
        return res.status(403).json({
            status: "error",
            code: "ACCESS_DENIED",
            message: "Evaluatee only."
        });
    }
    next();
};

// CHECK EVALUATOR.
export const isEvaluator = async (req, res, next) => {
    if (!req.user || req.user.role !== 'evaluator') {
        return res.status(403).json({
            status: "error",
            code: "ACCESS_DENIED",
            message: "Evaluator only."
        });
    }
    next();
};

// CHECK ADMIN.
export const isAdmin = async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            status: "error",
            code: "ACCESS_DENIED",
            message: "Admin only."
        });
    }
    next();
};