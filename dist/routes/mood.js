"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moodController_1 = require("../controllers/moodController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.auth);
// GET  /api/mood  — fetch mood history for logged-in user
router.get("/", moodController_1.getMoods);
// POST /api/mood  — save a new mood entry
router.post("/", moodController_1.createMood);
exports.default = router;
