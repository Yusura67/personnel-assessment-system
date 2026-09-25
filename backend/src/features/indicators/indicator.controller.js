// src/features/indicators/indicator.controller.js
// IMPORT MODULE.
import { createTopicService } from "./indicator.service.js";

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