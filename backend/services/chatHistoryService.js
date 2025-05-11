// services/chatHistoryService.js

const systemMessage = { role: "system", content: "Be useful and helpful." };

// ניהול היסטוריה בזיכרון בלבד
let chatHistory = [systemMessage];

function getHistory() {
  return chatHistory;
}

function addUserMessage(content) {
  chatHistory.push({ role: "user", content });
}

function addAssistantMessage(content) {
  chatHistory.push({ role: "assistant", content });
}

module.exports = {
  getHistory,
  addUserMessage,
  addAssistantMessage,
};
