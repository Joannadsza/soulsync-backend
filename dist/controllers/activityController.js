"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivities = exports.logActivity = void 0;
const Activity_1 = require("../models/Activity");
const logger_1 = require("../utils/logger");
const inngestEvents_1 = require("../utils/inngestEvents");
// Log a new activity
const logActivity = async (req, res, next) => {
    try {
        const { type, name, description, duration, difficulty, feedback } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const activity = new Activity_1.Activity({
            userId,
            type,
            name,
            description,
            duration,
            difficulty,
            feedback,
            timestamp: new Date(),
        });
        await activity.save();
        logger_1.logger.info(`Activity logged for user ${userId}`);
        await (0, inngestEvents_1.sendActivityCompletionEvent)({
            userId,
            id: activity._id,
            type,
            name,
            duration,
            difficulty,
            feedback,
            timestamp: activity.timestamp,
        });
        res.status(201).json({
            success: true,
            data: activity,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logActivity = logActivity;
// Get all activities for the logged-in user (last 30 days)
const getActivities = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activities = await Activity_1.Activity.find({
            userId,
            timestamp: { $gte: thirtyDaysAgo },
        }).sort({ timestamp: -1 });
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
};
exports.getActivities = getActivities;
