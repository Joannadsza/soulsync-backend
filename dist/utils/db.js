"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./logger");
const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb://aliciaferns_db_user:soulsync123@ac-f3ntqub-shard-00-00.laypnrd.mongodb.net:27017,ac-f3ntqub-shard-00-01.laypnrd.mongodb.net:27017,ac-f3ntqub-shard-00-02.laypnrd.mongodb.net:27017/ai-therapist?ssl=true&replicaSet=atlas-f2j2ae-shard-0&authSource=admin&appName=Cluster0";
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        logger_1.logger.info("Connected to MongoDB Atlas");
    }
    catch (error) {
        logger_1.logger.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
