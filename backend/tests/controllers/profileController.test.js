import request from "supertest";
import mongoose from "mongoose";
import app from "../../server.js";
import Profile from "../../models/Profile.js";
import User from "../../models/user.js";
import { generateToken } from "../../controllers/userController.js";

describe("Profile Controller", () => {
  let testUser;
  let authToken;

  const userCredentials = {
    email: "test@example.com",
    password: "password123",
    name: "Test User",
  };

  const profileData = {
    bio: "Test bio",
    dateOfBirth: "1990-01-01",
    interests: ["music", "movies"],
    location: "Test City",
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
    await Profile.deleteMany({});
    testUser = await User.create(userCredentials);
    authToken = generateToken(testUser._id);
  });

  describe("POST /api/profiles", () => {
    it("should create a new profile", async () => {
      const res = await request(app)
        .post("/api/profiles")
        .set("Authorization", `Bearer ${authToken}`)
        .send(profileData)
        .expect(201);

      expect(res.body.bio).toBe(profileData.bio);
      expect(res.body.user).toBe(testUser._id.toString());
      expect(res.body.interests).toEqual(
        expect.arrayContaining(profileData.interests)
      );
    });

    it("should not create profile without auth token", async () => {
      const res = await request(app)
        .post("/api/profiles")
        .send(profileData)
        .expect(401);

      expect(res.body.message).toMatch(/no token/i);
    });

    it("should validate required fields", async () => {
      const res = await request(app)
        .post("/api/profiles")
        .set("Authorization", `Bearer ${authToken}`)
        .send({})
        .expect(400);

      expect(res.body.message).toMatch(/required/i);
    });

    it("should not create duplicate profile for user", async () => {
      await Profile.create({ ...profileData, user: testUser._id });

      const res = await request(app)
        .post("/api/profiles")
        .set("Authorization", `Bearer ${authToken}`)
        .send(profileData)
        .expect(400);

      expect(res.body.message).toMatch(/profile already exists/i);
    });
  });

  describe("PUT /api/profiles", () => {
    let existingProfile;

    beforeEach(async () => {
      existingProfile = await Profile.create({
        ...profileData,
        user: testUser._id,
      });
    });

    it("should update existing profile", async () => {
      const updateData = {
        bio: "Updated bio",
        interests: ["coding", "gaming"],
      };

      const res = await request(app)
        .put("/api/profiles")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(res.body.bio).toBe(updateData.bio);
      expect(res.body.interests).toEqual(
        expect.arrayContaining(updateData.interests)
      );
    });

    it("should not update profile of different user", async () => {
      const otherUser = await User.create({
        email: "other@example.com",
        password: "password123",
        name: "Other User",
      });
      const otherToken = generateToken(otherUser._id);

      const res = await request(app)
        .put("/api/profiles")
        .set("Authorization", `Bearer ${otherToken}`)
        .send({ bio: "Hacked bio" })
        .expect(404);

      expect(res.body.message).toMatch(/profile not found/i);
    });
  });

  describe("GET /api/profiles/:userId", () => {
    let existingProfile;

    beforeEach(async () => {
      existingProfile = await Profile.create({
        ...profileData,
        user: testUser._id,
      });
    });

    it("should get profile by user ID", async () => {
      const res = await request(app)
        .get(`/api/profiles/${testUser._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(res.body.bio).toBe(profileData.bio);
      expect(res.body.user).toBe(testUser._id.toString());
    });

    it("should return 404 for non-existent profile", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .get(`/api/profiles/${nonExistentId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(404);

      expect(res.body.message).toMatch(/not found/i);
    });
  });
});
