import { vi } from "vitest";
import jwt from "jsonwebtoken";
import { auth } from "../../middleware/auth.js";
import User from "../../models/user.js";

vi.mock("jsonwebtoken");
vi.mock("../../models/user.js");

describe("Auth Middleware", () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      header: vi.fn(),
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
  });

  it("should add user to request object when valid token is provided", async () => {
    const mockUser = {
      _id: "user123",
      name: "Test User",
      email: "test@example.com",
    };

    mockReq.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue({ id: "user123" });
    User.findById.mockResolvedValue(mockUser);

    await auth(mockReq, mockRes, mockNext);

    expect(mockReq.user).toEqual(mockUser);
    expect(mockNext).toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", async () => {
    mockReq.header.mockReturnValue(null);

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "No token, authorization denied",
    });
  });

  it("should return 401 for invalid token format", async () => {
    mockReq.header.mockReturnValue("invalidformat");

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Token format invalid, authorization denied",
    });
  });

  it("should return 401 for malformed token", async () => {
    mockReq.header.mockReturnValue("Bearer invalidtoken");
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Token is not valid",
    });
  });

  it("should return 401 if user no longer exists", async () => {
    mockReq.header.mockReturnValue("Bearer validtoken");
    jwt.verify.mockReturnValue({ id: "user123" });
    User.findById.mockResolvedValue(null);

    await auth(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });
});
