"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMoods = exports.createMood = void 0;
const Mood_1 = require("../models/Mood");
const logger_1 = require("../utils/logger");
const inngestEvents_1 = require("../utils/inngestEvents");
// POST - Create a new mood entry
const createMood = async (req, res, next) => {
    try {
        const { score, note, context, activities } = req.body;
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const mood = new Mood_1.Mood({
            userId,
            score,
            note,
            context,
            activities,
            timestamp: new Date(),
        });
        await mood.save();
        logger_1.logger.info(`Mood entry created for user ${userId}`);
        await (0, inngestEvents_1.sendMoodUpdateEvent)({
            userId,
            mood: score,
            note,
            context,
            activities,
            timestamp: mood.timestamp,
        });
        res.status(201).json({
            success: true,
            data: mood,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createMood = createMood;
// GET - Fetch mood entries for the current user (last 30 days)
const getMoods = async (req, res, next) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const moods = await Mood_1.Mood.find({
            userId,
            timestamp: { $gte: thirtyDaysAgo },
        }).sort({ timestamp: -1 });
        res.json(moods);
    }
    catch (error) {
        next(error);
    }
};
exports.getMoods = getMoods;
