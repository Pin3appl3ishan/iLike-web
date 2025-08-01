import {
  authenticateToken as sharedAuth,
  verifyToken as sharedVerifyToken,
} from "../utils/authUtils.js";
import User from "../models/user.js";

// Use shared authentication logic
export const authenticateToken = async (req, res, next) => {
  try {
    console.log("🔍 Verifying token..."); // Log the start of token verification

    // Use shared authentication utility
    await sharedAuth(req, res, next);

    console.log("✅ Token verified, user:", req.user?.name);
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// Alias for backward compatibility
export const verifyToken = authenticateToken;

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized as an admin",
    });
  }
};

// Middleware to check if user has completed profile
export const hasCompletedProfile = (req, res, next) => {
  if (req.user && req.user.hasCompletedProfile) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Please complete your profile first",
    });
  }
};
