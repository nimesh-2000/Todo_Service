const request = require("supertest");
const app = require("../app");
const db = require("../db");

afterAll(() => {
  db.end(); 
});

describe("Task API", () => {

  it("should create a new task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({
        title: "Test Task",
        description: "Test Description"
      });

    expect(res.statusCode).toBe(200);
  });

  it("should get tasks", async () => {
    const res = await request(app).get("/tasks");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});