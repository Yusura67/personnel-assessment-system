// src/features/indicators/indicator.controller.js
// IMPORT MODULE.
import { createTopicService, createIndicatorService, getTopicWithIndicatorsService, deleteTopicService, deleteIndicatorService } from "./indicator.service.js";

// CREATE TOPIC.
export const createTopic = async (req, res) => {
    try {
        // Get data from user.
        const { topic_name, period_id } = req.body;

        if (!topic_name || !period_id) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "topic_name and period_id is required."
            });
        }

        // Process.
        const result = await createTopicService(req.body);

        // Return Result.
        return res.status(201).json({
            status: "success",
            message: "Topic is Created!",
            data: result
        });
    
    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create topic."
        });
    }
};

// CREATE INDICATOR.
export const createIndicator = async (req, res) => {
    try {
        const { indicator_name, weight, eval_type, period_id, topic_id } = req.body;

        if (!indicator_name || weight === undefined || !eval_type || !period_id || !topic_id) {
            return res.status(400).json({
                status: "error",
                code: "INVALID_DATA",
                message: "indicator_name, weight, eval_type, period_id and topic_id is required."
            });
        }

        // Process.
        const result = await createIndicatorService(req.body);

        // Return Result.
        return res.status(201).json({
            status: "success",
            message: "Indicator is Created!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create indicator."
        });
    }
};

// GET TOPICS WITH INDICATORS.
export const getTopicsWithIndicators = async (req, res) => {
    try {
        const periodId = req.params.id;

        // Process.
        const result = await getTopicWithIndicatorsService(periodId);

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Topics and Indicators is Fetched!",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch topics and indicators."
        });
    }
};

// DELETE TOPIC.
export const deleteTopic = async (req, res) => {
    try {
        const  topicId = req.params.id;

        // Process.
        const result = await deleteTopicService(topicId);

        // Validate.
        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "TOPIC_NOT_FOUND",
                message: "topic not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Topic was deleted.",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete topic."
        });
    }
};

// DELETE INDICATOR.
export const deleteIndicator = async (req, res) => {
    try {
        const  indicatorId = req.params.id;

        // Process.
        const result = await deleteIndicatorService(indicatorId);

        // Validate.
        if (!result) {
            return res.status(404).json({
                status: "error",
                code: "INDICATOR_NOT_FOUND",
                message: "indicator not found."
            });
        }

        // Return Result.
        return res.status(200).json({
            status: "success",
            message: "Indicator was deleted.",
            data: result
        });

    } catch(error) {
        // ERROR HANDLING.
        console.error("SYSTEM ERROR: ", error);
        return res.status(500).json({
            status: "error",
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to delete indicator."
        });
    }
};