import express from 'express';
import { registerUser, loginUser, editUserProfile } from '../controller/userController';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);
import { protect } from '../middleware/authMiddleware';

// Edit profile route
router.put('/profile', protect, editUserProfile);
export default router;