import request from "supertest";
import { config } from "../../src/config";
import mongoose from "mongoose";

beforeEach(async () => {
  await mongoose.connect(config.mongo.url);
  
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("user sign up", () => {
  it("should create a user", async () => {
    const res = await request("http://localhost:6050").post("/users/register").send({
      email: "user@example.com",
      password: "12@WEcvf2!5",
    });
    expect(res.statusCode).toBe(201);
    console.log(res.body);
    expect(res.body).toBeDefined();
  });
});
describe("user sign in", () => {
  it("should sign in", async () => {
    const res = await request("http://localhost:6050")
      .post("/users/login")
      .send({
        email: "user@example.com",
        password: "12@WEcvf2!5",
      });
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    expect(res.body).toBeDefined();
  });
});