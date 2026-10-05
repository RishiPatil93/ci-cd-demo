const request = require("supertest");
const app = require("../app");

describe("Application Tests", () => {
  test("GET / should return success message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "CI/CD Pipeline is Working!"
    );
  });

  test("GET /health should return OK", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("OK");
  });
});
