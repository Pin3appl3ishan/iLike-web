const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  getCurrentUser,
  updateProfile,
  getAllUsers,
  likeUser,
  dislikeUser,
  getMatches,
} = require("../controllers/userController");

const verifyToken = require("../middleware/verifyToken");

router.post("/register", register);
router.post("/login", login);

// Protected routes (requires valid token to access)
router.get("/", verifyToken, getAllUsers);
router.get("/me", verifyToken, getCurrentUser);

// router.get("/profile/:id", verifyToken, getProfile);
// router.put("/profile/:id", verifyToken, updateProfile);
router
  .route("/profile/:id")
  .get(verifyToken, getProfile)
  .put(verifyToken, updateProfile);

router.post("/like/:id", verifyToken, likeUser);

router.post("/dislike/:id", verifyToken, dislikeUser);

router.get("/matches", verifyToken, getMatches);

module.exports = router;
