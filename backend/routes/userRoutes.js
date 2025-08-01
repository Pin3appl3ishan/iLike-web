import express from 'express';
import { 
  register,
  login,
  getProfile,
  getCurrentUser,
  updateProfile,
  getAllUsers,
  likeUser,
  dislikeUser,
  getMatches 
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (requires valid token to access)
router.get('/', authenticateToken, getAllUsers);
router.get('/me', authenticateToken, getCurrentUser);

// Profile routes
router.route('/profile/:id')
  .get(authenticateToken, getProfile)
  .put(authenticateToken, updateProfile);

// Like/Dislike routes
router.post('/like/:id', authenticateToken, likeUser);
router.post('/dislike/:id', authenticateToken, dislikeUser);

// Matches route
router.get('/matches', authenticateToken, getMatches);

export default router;
