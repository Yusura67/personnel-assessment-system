// src/features/periods/period.controller.js
// IMPORT MODULE.
import { getAllPeriodsService  } from "./period.service.js";

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