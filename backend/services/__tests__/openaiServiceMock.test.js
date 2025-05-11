const { callGPT } = require('../openaiServiceMock');

describe('OpenAI Service Mock', () => {
  test('should return a greeting response for hello message', async () => {
    const chatHistory = [
      { role: 'system', content: 'Be helpful' },
      { role: 'user', content: 'hello' }
    ];
    
    const response = await callGPT(chatHistory);
    expect(response).toMatch(/^(Hello|Hi|Greetings)/);
  });

  test('should return weather information for weather query', async () => {
    const chatHistory = [
      { role: 'system', content: 'Be helpful' },
      { role: 'user', content: 'what is the weather like?' }
    ];
    
    const response = await callGPT(chatHistory);
    expect(response).toMatch(/The weather in .+ is (sunny|cloudy|rainy) with a temperature of \d+°C/);
  });

  test('should return a paragraph for general queries', async () => {
    const chatHistory = [
      { role: 'system', content: 'Be helpful' },
      { role: 'user', content: 'tell me something interesting' }
    ];
    
    const response = await callGPT(chatHistory);
    expect(response.length).toBeGreaterThan(20); // Ensure it's a reasonable length
  });
}); 