// src/features/periods/period.controller.js
// IMPORT MODULE.
import {
    getAllPeriodsService,
    getPeriodByIdService,
    createPeriodService,
    updatePeriodService,
    getActivePeriodService,
    deletePeriodService
} from "./period.service.js";

// GET ALL PERIODS.
export const getAllPeriods = async (req, res) => {
    try {
        // Process.
        const result = await getAllPeriodsService();

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "All Period is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get all period."
        });
    }
};

// GET PERIOD BY ID.
export const getPeriodById = async (req, res) => {
    try {
        const periodId = req.params.id;

        // Process.
        const result = await getPeriodByIdService(periodId);

        // Validate data.
        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "PERIOD_NOT_FOUND",
                message: "Period not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Period is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get a period."
        });
    }
};

// CREATE PERIOD.
export const createPeriod = async (req, res) => {
    try {
        // Get data from user.
        const { period_name, start_date, end_date } = req.body;

        // Validate data.
        if (!period_name || typeof period_name !== 'string' || !start_date || typeof start_date !== 'string' || !end_date || typeof end_date !== 'string') {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "period_name, start_date and end_date is required."
            });
        }

        // Process.
        const result = await createPeriodService(req.body);

        // Return Result.
        return res.status(201).json({
            status: "success",
            message: "Period is Created!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create period."
        });
    }
};

// UPDATE PERIOD.
export const updatePeriod = async (req, res) => {
    try {
        // Get data.
        const periodId = req.params.id;
        const { period_name, start_date, end_date, status } = req.body;

        // Validate data.
        if (!period_name || typeof period_name !== 'string' || !start_date || typeof start_date !== 'string' || !end_date || typeof end_date !== 'string' || !status || typeof status !== 'string') {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "period_name, start_date, end_date and status is required."
            });
        }

        // Process.
        const result = await updatePeriodService(periodId, req.body);

        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "PERIOD_NOT_FOUND",
                message: "Period not found."
            })
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Period is Updated!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update period."
        });
    }
};

// GET ACTIVE PERIOD.
export const getActivePeriod = async (req, res) => {
    try {
        // Process.
        const result = await getActivePeriodService();

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Active Period is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to get active period."
        });
    }
};

// DELETE PERIOD.
export const deletePeriod = async (req, res) => {
    try {
        // Get data.
        const periodId = req.params.id;

        // Process.
        const result = await deletePeriodService(periodId);

        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "PERIOD_NOT_FOUND",
                message: "Period not found."
            })
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Period was deleted.",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete period."
        });
    }
};