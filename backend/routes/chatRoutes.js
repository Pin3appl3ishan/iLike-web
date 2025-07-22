import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getChats,
  getMessages,
  sendMessage,
  markMessagesAsRead,
  createChat,
  getChatById,
  deleteChat,
} from "../controllers/chatController.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all chats for the current user
router.get("/", getChats);

// Create a new chat
router.post("/", createChat);

// Get chat by ID
router.get("/:chatId", getChatById);

// Get messages for a specific chat
router.get("/:chatId/messages", getMessages);

// Send a message in a chat
router.post("/:chatId/messages", sendMessage);

// Mark messages as read in a chat
router.put("/:chatId/read", markMessagesAsRead);

// Delete a chat (soft delete)
router.delete("/:chatId", deleteChat);

export default router;
