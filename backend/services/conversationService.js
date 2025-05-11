const { callGPT } = require("./openaiService");

class ConversationService {
  constructor() {
    this.system = `Be useful and helpful.`;
    // Initialize chat history with system message
    this.chatHistory = [
      { role: "system", content: this.system }
    ];
  }

  /**
   * Validate user message
   * @param {string} message - User message
   * @returns {boolean} - Is message valid
   */
  validateMessage(message) {
    return message && message.trim() !== "";
  }

  /**
   * Process user message and get AI response
   * @param {string} message - User message
   * @returns {Promise<string>} - AI response
   */
  async processMessage(message) {
    if (!this.validateMessage(message)) {
      throw new Error("Empty message");
    }

    // Add user message to history
    this.chatHistory.push({ role: "user", content: message });

    // Get response from LLM
    const response = await callGPT(this.chatHistory);

    // Add assistant response to history
    this.chatHistory.push({ role: "assistant", content: response });

    return response;
  }

  /**
   * Get the current chat history
   * @returns {Array} - Chat history
   */
  getHistory() {
    return [...this.chatHistory];
  }

  /**
   * Reset the conversation
   */
  resetConversation() {
    this.chatHistory = [
      { role: "system", content: this.system }
    ];
  }
}

module.exports = new ConversationService(); 