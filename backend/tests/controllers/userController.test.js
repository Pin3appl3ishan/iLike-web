import request from "supertest";
import mongoose from "mongoose";
import app from "../../server.js";
import User from "../../models/user.js";
import { generateToken } from "../../controllers/userController.js";

describe("User Controller", () => {
  let testUser;
  const userCredentials = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI_TEST || "mongodb://localhost:27017/ilike-test"
    );
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send(userCredentials)
        .expect(201);

      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(userCredentials.email);
      expect(res.body.user.name).toBe(userCredentials.name);
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should not register user with existing email", async () => {
      await User.create(userCredentials);

      const res = await request(app)
        .post("/api/users/register")
        .send(userCredentials)
        .expect(400);

      expect(res.body.message).toMatch(/email already exists/i);
    });

    it("should validate required fields", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({})
        .expect(400);

      expect(res.body.message).toMatch(/required/i);
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      testUser = await User.create(userCredentials);
    });

    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: userCredentials.email,
          password: userCredentials.password,
        })
        .expect(200);

      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(userCredentials.email);
    });

    it("should not login with wrong password", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: userCredentials.email,
          password: "wrongpassword",
        })
        .expect(401);

      expect(res.body.message).toMatch(/invalid credentials/i);
    });

    it("should not login non-existent user", async () => {
      const res = await request(app)
        .post("/api/users/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        })
        .expect(401);

      expect(res.body.message).toMatch(/invalid credentials/i);
    });
  });

  describe("GET /api/users/me", () => {
    beforeEach(async () => {
      testUser = await User.create(userCredentials);
    });

    it("should get authenticated user profile", async () => {
      const token = generateToken(testUser._id);

      const res = await request(app)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(res.body.email).toBe(userCredentials.email);
      expect(res.body.name).toBe(userCredentials.name);
    });

    it("should not access profile without token", async () => {
      const res = await request(app).get("/api/users/me").expect(401);

      expect(res.body.message).toMatch(/no token/i);
    });
  });
});
