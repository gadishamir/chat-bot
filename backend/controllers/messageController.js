// controllers/messageController.js

const { callGPT } = require("../services/openaiService");
const {
  getHistory,
  addUserMessage,
  addAssistantMessage
} = require("../services/chatHistoryService");

async function handleMessage(req, res) {
  try {
    const content = req.body.message;

    if (content.trim() === "") {
      console.log('Empty message received');
      return res.status(400).json({ error: "Empty message" });
    }

    // שימוש בסרוויס
    addUserMessage(content);

    const response = await callGPT(getHistory());

    addAssistantMessage(response);

    return res.json({ message: response });
  } catch (error) {
    console.error('Error in handleMessage:', error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

module.exports = { handleMessage };
