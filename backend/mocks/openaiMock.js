const { faker } = require('@faker-js/faker');

class OpenAIMock {
    constructor() {
        this.conversationHistory = [];
    }

    // Mock the chat completion endpoint
    async createChatCompletion(params) {
        const { messages } = params;
        
        // Store the conversation history
        this.conversationHistory = messages;

        // Generate a realistic response using Faker
        const response = {
            id: faker.string.uuid(),
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: params.model || 'gpt-3.5-turbo',
            choices: [
                {
                    index: 0,
                    message: {
                        role: 'assistant',
                        content: this.generateResponse(messages[messages.length - 1].content)
                    },
                    finish_reason: 'stop'
                }
            ],
            usage: {
                prompt_tokens: faker.number.int({ min: 10, max: 100 }),
                completion_tokens: faker.number.int({ min: 10, max: 100 }),
                total_tokens: faker.number.int({ min: 20, max: 200 })
            }
        };

        return response;
    }

    // Generate a realistic response based on the user's input
    generateResponse(userInput) {
        // Generate different types of responses based on the input
        if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
            return faker.helpers.arrayElement([
                'Hello! How can I assist you today?',
                'Hi there! What can I help you with?',
                'Greetings! How may I be of service?'
            ]);
        }

        if (userInput.toLowerCase().includes('weather')) {
            return `The weather in ${faker.location.city()} is ${faker.helpers.arrayElement(['sunny', 'cloudy', 'rainy'])} with a temperature of ${faker.number.int({ min: 0, max: 35 })}°C.`;
        }

        if (userInput.toLowerCase().includes('joke')) {
            return faker.helpers.arrayElement([
                'Why don\'t scientists trust atoms? Because they make up everything!',
                'What do you call a fake noodle? An impasta!',
                'How does a penguin build its house? Igloos it together!'
            ]);
        }

        // Default response for other inputs
        return faker.lorem.paragraph();
    }

    // Mock the models endpoint
    async listModels() {
        return {
            data: [
                {
                    id: 'gpt-3.5-turbo',
                    object: 'model',
                    created: 1677610602,
                    owned_by: 'openai'
                },
                {
                    id: 'gpt-4',
                    object: 'model',
                    created: 1677610602,
                    owned_by: 'openai'
                }
            ]
        };
    }
}

module.exports = OpenAIMock; 