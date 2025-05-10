const { callGPT } = require("../services/openaiService");

const system = `Be useful and helpful.`;

// Initialize chat history with system message
let chatHistory = [
  { role: "system", content: system }
];

async function handleMessage(req, res) {

  try {
    const content = req.body.message;

    if (content.trim() === "") {
      console.log('Empty message received');
      return res.status(400).json({ error: "Empty message" });
    }

    // Add user message to history
    chatHistory.push({ role: "user", content: content });

    // Get response from GPT
    const response = await callGPT(chatHistory);

    // Add assistant response to history
    chatHistory.push({ role: "assistant", content: response });

    return res.json({ message: response });
  } catch (error) {
    console.error('Error in handleMessage:', error);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
}

module.exports = { handleMessage };
