import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../server";
import User from "../../models/user";
import Chat from "../../models/Chat";
import Message from "../../models/Message";
import { generateToken } from "../../utils/authUtils";

describe("Chat Controller", () => {
  let token;
  let user1;
  let user2;
  let chat;

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

    // Create a test chat
    chat = await Chat.create({
      participants: [user1._id, user2._id],
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    await mongoose.connection.close();
  });

  describe("GET /api/chat/conversations", () => {
    it("should return user conversations", async () => {
      const response = await request(app)
        .get("/api/chat/conversations")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].participants).toHaveLength(2);
    });

    it("should return empty array when no conversations exist", async () => {
      await Chat.deleteMany({});

      const response = await request(app)
        .get("/api/chat/conversations")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveLength(0);
    });

    it("should require authentication", async () => {
      const response = await request(app)
        .get("/api/chat/conversations")
        .expect(401);

      expect(response.body.error).toBeTruthy();
    });
  });

  describe("GET /api/chat/messages/:chatId", () => {
    it("should return chat messages", async () => {
      // Create test messages
      await Message.create({
        chatId: chat._id,
        senderId: user1._id,
        content: "Hello!",
      });

      const response = await request(app)
        .get(`/api/chat/messages/${chat._id}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].content).toBe("Hello!");
    });

    it("should handle invalid chat ID", async () => {
      const response = await request(app)
        .get("/api/chat/messages/invalidid")
        .set("Authorization", `Bearer ${token}`)
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });

    it("should prevent unauthorized access to chat", async () => {
      const unauthorizedUser = await User.create({
        name: "Unauthorized User",
        email: "unauthorized@example.com",
        password: "password123",
      });

      const unauthorizedToken = generateToken(unauthorizedUser._id);

      const response = await request(app)
        .get(`/api/chat/messages/${chat._id}`)
        .set("Authorization", `Bearer ${unauthorizedToken}`)
        .expect(403);

      expect(response.body.error).toBe("Not authorized to access this chat");
    });
  });

  describe("POST /api/chat/messages", () => {
    it("should create a new message", async () => {
      const messageData = {
        chatId: chat._id,
        content: "Test message",
      };

      const response = await request(app)
        .post("/api/chat/messages")
        .set("Authorization", `Bearer ${token}`)
        .send(messageData)
        .expect(201);

      expect(response.body.content).toBe(messageData.content);
      expect(response.body.senderId.toString()).toBe(user1._id.toString());
    });

    it("should validate message content", async () => {
      const messageData = {
        chatId: chat._id,
        content: "",
      };

      const response = await request(app)
        .post("/api/chat/messages")
        .set("Authorization", `Bearer ${token}`)
        .send(messageData)
        .expect(400);

      expect(response.body.error).toBe("Message content is required");
    });

    it("should handle invalid chat ID", async () => {
      const messageData = {
        chatId: "invalidid",
        content: "Test message",
      };

      const response = await request(app)
        .post("/api/chat/messages")
        .set("Authorization", `Bearer ${token}`)
        .send(messageData)
        .expect(400);

      expect(response.body.error).toBeTruthy();
    });

    it("should prevent sending message to unauthorized chat", async () => {
      const unauthorizedChat = await Chat.create({
        participants: [user2._id, mongoose.Types.ObjectId()],
      });

      const messageData = {
        chatId: unauthorizedChat._id,
        content: "Test message",
      };

      const response = await request(app)
        .post("/api/chat/messages")
        .set("Authorization", `Bearer ${token}`)
        .send(messageData)
        .expect(403);

      expect(response.body.error).toBe(
        "Not authorized to send message to this chat"
      );
    });
  });
});
