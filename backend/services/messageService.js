const { callGPT } = require("./openaiService");

const system = `Be useful and helpful.`;

// Initialize chat history with system message
let chatHistory = [
  { role: "system", content: system }
];

async function processMessage(message) {
  if (message.trim() === "") {
    throw new Error("Empty message");
  }

  // Add user message to history
  chatHistory.push({ role: "user", content: message });

  // Get response from GPT
  const response = await callGPT(chatHistory);

  // Add assistant response to history
  chatHistory.push({ role: "assistant", content: response });

  return { message: response };
}

module.exports = {
  processMessage
}; 