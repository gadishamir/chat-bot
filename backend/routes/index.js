// routes/index.js
const express = require("express");
const { 
  handleMessage, 
  getConversationHistory, 
  resetConversation 
} = require("../controllers/messageController");

const router = express.Router();

// Conversation resource endpoints
router.post("/conversation/messages", handleMessage);
router.get("/conversation/history", getConversationHistory);
router.delete("/conversation", resetConversation);

// For backward compatibility
router.post("/message", handleMessage);

module.exports = router;
