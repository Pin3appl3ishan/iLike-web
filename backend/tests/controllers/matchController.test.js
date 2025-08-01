import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../server";
import User from "../../models/user";
import Match from "../../models/Match";
import { generateToken } from "../../utils/authUtils";

describe("Match Controller", () => {
  let token;
  let user1;
  let user2;

  beforeAll(async () => {
    // Create test users
    user1 = await User.create({
      name: "Test User 1",
      email: "test1@example.com",
      password: "password123",
    });

    user2 = await User.create({
      name: "Test User 2",
      email: "test2@example.com",
      password: "password123",
    });

    token = generateToken(user1._id);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Match.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/matches/like/:userId", () => {
    it("should create a new like", async () => {
      const response = await request(app)
        .post(`/api/matches/like/${user2._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.message).toBe("Like recorded successfully");
    });

    it("should create a match when mutual like occurs", async () => {
      // User2 likes User1
      await Match.create({
        userId: user2._id,
        likedUserId: user1._id,
      });

      // User1 likes User2
      const response = await request(app)
        .post(`/api/matches/like/${user2._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body.isMatch).toBe(true);
    });

    it("should prevent self-liking", async () => {
      const response = await request(app)
        .post(`/api/matches/like/${user1._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      expect(response.body.error).toBe("Cannot like yourself");
    });

    it("should handle invalid user ID", async () => {
      const response = await request(app)
        .post("/api/matches/like/invalidid")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("GET /api/matches", () => {
    it("should return user matches", async () => {
      const response = await request(app)
        .get("/api/matches")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return empty array when no matches exist", async () => {
      await Match.deleteMany({});

      const response = await request(app)
        .get("/api/matches")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveLength(0);
    });

    it("should require authentication", async () => {
      const response = await request(app).get("/api/matches").expect(401);

      expect(response.body.error).toBeTruthy();
    });
  });
});
