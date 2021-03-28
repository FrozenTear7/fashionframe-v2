import {
  createUser,
  loginUser,
  getOwnProfile,
  logoutUser,
} from './../controllers/authController';
import express from 'express';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', auth, getOwnProfile);
router.post('/me/logout', auth, logoutUser);

export default router;
