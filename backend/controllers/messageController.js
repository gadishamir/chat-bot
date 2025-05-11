const { processMessage } = require("../services/messageService");

async function handleMessage(req, res) {
  try {
    const { message } = req.body;
    const response = await processMessage(message);
    return res.json(response);
  } catch (error) {
    console.error('Error in handleMessage:', error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { handleMessage };
