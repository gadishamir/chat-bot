const { handleMessage } = require("../controllers/messageController");
const httpMocks = require("node-mocks-http");
const { faker } = require("@faker-js/faker");

// טסט 1: בדיקה רגילה עם הודעה תקינה
test("should return a GPT response for a fake user message", async () => {
  const fakeMessage = faker.lorem.sentence();

  const req = httpMocks.createRequest({
    method: "POST",
    url: "/message",
    body: {
      message: fakeMessage,
    },
  });

  const res = httpMocks.createResponse();

  await handleMessage(req, res);

  const data = res._getJSONData();

  expect(res.statusCode).toBe(200);
  expect(data.message).toBeDefined();
  expect(typeof data.message).toBe("string");
});

// טסט 2: הודעה ריקה
test("should return 400 for empty message", async () => {
  const req = httpMocks.createRequest({
    method: "POST",
    url: "/message",
    body: {
      message: "   ", // ריק אחרי trim
    },
  });

  const res = httpMocks.createResponse();

  await handleMessage(req, res);

  expect(res.statusCode).toBe(400);
  const data = res._getJSONData();
  expect(data.error).toBe("Empty message");
});
