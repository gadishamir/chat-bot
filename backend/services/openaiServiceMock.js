require('dotenv').config();
const { faker } = require('@faker-js/faker');

// Environment variables with defaults
const MOCK_DELAY_MIN = process.env.MOCK_DELAY_MIN || 100;
const MOCK_DELAY_MAX = process.env.MOCK_DELAY_MAX || 500;
const MOCK_TEMP_MIN = process.env.MOCK_TEMP_MIN || 15;
const MOCK_TEMP_MAX = process.env.MOCK_TEMP_MAX || 30;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callGPTMock(chatHistory) {
  // Simulate network delay using environment variables
  await delay(faker.number.int({ 
    min: parseInt(MOCK_DELAY_MIN), 
    max: parseInt(MOCK_DELAY_MAX) 
  }));

  // Generate different types of responses based on the last user message
  const lastUserMessage = chatHistory[chatHistory.length - 1].content.toLowerCase();
  
  if (lastUserMessage.includes('hello') || lastUserMessage.includes('hi')) {
    return faker.helpers.arrayElement([
      "Hello! How can I help you today?",
      "Hi there! What can I do for you?",
      "Greetings! How may I assist you?"
    ]);
  }

  if (lastUserMessage.includes('weather')) {
    return `The weather in ${faker.location.city()} is ${faker.helpers.arrayElement(['sunny', 'cloudy', 'rainy'])} with a temperature of ${faker.number.int({ 
      min: parseInt(MOCK_TEMP_MIN), 
      max: parseInt(MOCK_TEMP_MAX) 
    })}°C.`;
  }

  // Default response
  return faker.lorem.paragraph();
}

module.exports = {
  callGPT: callGPTMock
}; 