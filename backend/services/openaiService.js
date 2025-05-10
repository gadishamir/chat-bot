// services/openaiService.js
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
const path = require("path");

// Fix the path to .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Log if API key is loaded
console.log('API Key loaded:', process.env.API_KEY ? 'Yes' : 'No');

const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error('No API key found in environment variables');
    throw new Error('OpenAI API key is required');
}

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function callGPT(chatHistory) {
  try {
    console.log('Sending request to OpenAI with messages:', chatHistory);

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: chatHistory,
    });

    console.log('Received response from OpenAI:', response.data.choices[0]);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in callGPT:", error);
    return `An error occurred while processing the request: ${error.message}`;
  }
}

module.exports = { callGPT };
