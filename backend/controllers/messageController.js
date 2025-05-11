const conversationService = require("../services/conversationService");

/**
 * Handle incoming message requests
 */
async function handleMessage(req, res) {
  try {
    const message = req.body.message;
    
    // Let the service handle the message processing
    const response = await conversationService.processMessage(message);
    
    return res.json({ message: response });
  } catch (error) {
    console.error('Error in handleMessage:', error);
    
    if (error.message === "Empty message") {
      return res.status(400).json({ error: "Empty message" });
    }
    
    return res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
}

/**
 * Get the conversation history
 */
function getConversationHistory(req, res) {
  try {
    const history = conversationService.getHistory();
    return res.json({ history });
  } catch (error) {
    console.error('Error getting conversation history:', error);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
}

/**
 * Reset the conversation
 */
function resetConversation(req, res) {
  try {
    conversationService.resetConversation();
    return res.json({ message: "Conversation reset successfully" });
  } catch (error) {
    console.error('Error resetting conversation:', error);
    return res.status(500).json({ 
      error: "Internal server error", 
      details: error.message 
    });
  }
}

module.exports = { 
  handleMessage,
  getConversationHistory,
  resetConversation
};
