const OpenAIMock = require('../mocks/openaiMock');

describe('OpenAIMock', () => {
    let openaiMock;

    beforeEach(() => {
        openaiMock = new OpenAIMock();
    });

    test('should generate a response for a greeting message', async () => {
        const response = await openaiMock.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: 'Hello!' }
            ]
        });

        // Verify response structure
        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('object', 'chat.completion');
        expect(response).toHaveProperty('model', 'gpt-3.5-turbo');
        expect(response.choices).toHaveLength(1);
        expect(response.choices[0].message).toHaveProperty('role', 'assistant');
        expect(response.choices[0].message).toHaveProperty('content');
        
        // Verify the content is a greeting response
        const content = response.choices[0].message.content;
        expect(content).toMatch(/^(Hello|Hi|Greetings)/i);
    });

    test('should list available models', async () => {
        const models = await openaiMock.listModels();

        // Verify models structure
        expect(models).toHaveProperty('data');
        expect(Array.isArray(models.data)).toBe(true);
        expect(models.data.length).toBeGreaterThan(0);

        // Verify model properties
        const model = models.data[0];
        expect(model).toHaveProperty('id');
        expect(model).toHaveProperty('object', 'model');
        expect(model).toHaveProperty('created');
        expect(model).toHaveProperty('owned_by', 'openai');

        // Verify specific models are present
        const modelIds = models.data.map(m => m.id);
        expect(modelIds).toContain('gpt-3.5-turbo');
        expect(modelIds).toContain('gpt-4');
    });
}); 