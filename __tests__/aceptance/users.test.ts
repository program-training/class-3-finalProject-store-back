import request from "supertest";
import { app } from "../../src/server";
import { connectionToDB } from "../../src/connectionToDB";
import { config } from "../../src/config";
import mongoose, { Connection } from "mongoose";
const port = config.server.port;
let connection, server;
beforeAll((done) => {
  done();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe("user sign up", () => {
  it("should create user successfully", async () => {
    const newUser = {
      "email": "user@example.com",
      "password": "12@WEcvf2!5",
    };
    const response = await request(app)
      .post("/users/register")
      .send(newUser)
      .timeout({ response: 20000 })
      .expect(201);

    const user = response.body;
    expect(user).toBeDefined();
    expect(user).toEqual(newUser);
  });
});
