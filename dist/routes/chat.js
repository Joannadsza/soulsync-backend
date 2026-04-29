"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_1 = require("../controllers/chat");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Apply auth middleware to all routes
router.use(auth_1.auth);
// Get all chat sessions for the logged-in user
router.get("/sessions", chat_1.getAllSessions);
// Create a new chat session
router.post("/sessions", chat_1.createChatSession);
// Delete a chat session
router.delete("/sessions/:sessionId", chat_1.deleteSession);
// Get a specific chat session
router.get("/sessions/:sessionId", chat_1.getChatSession);
// Send a message in a chat session
router.post("/sessions/:sessionId/messages", chat_1.sendMessage);
// Get chat history for a session
router.get("/sessions/:sessionId/history", chat_1.getChatHistory);
// End-of-session mood analysis — call this once when the session ends
router.post("/sessions/:sessionId/analyse", chat_1.analyseSession);
// Crisis analysis
router.post("/crisis-analysis", chat_1.analyseCrisis);
exports.default = router;
