import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getPotentialMatches,
  likeUser,
  dislikeUser,
  getMatches,
  getLikes,
  getLikesSent,
} from "../controllers/matchController.js";

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get potential matches for the current user
router.get("/potential", getPotentialMatches);

// Like a user
router.post("/like/:userId", likeUser);

// Dislike a user (remove like)
router.delete("/like/:userId", dislikeUser);

// Get user's matches
router.get("/", getMatches);

// Get user's likes (people who liked them)
router.get("/likes", getLikes);

// Get likes sent by current user
router.get("/likes-sent", getLikesSent);

export default router;
