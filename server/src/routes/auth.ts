import {
  createUser,
  loginUser,
  getOwnProfile,
  logoutUser,
} from './../controllers/authController';
import express from 'express';
import auth from '../middleware/auth';
import csrf from 'csurf';

const csrfProtection = csrf({
  cookie: true,
});

const router = express.Router();

router.post('/', csrfProtection, createUser);
router.post('/login', csrfProtection, loginUser);
router.get('/me', getOwnProfile);
router.post('/logout', [csrfProtection, auth], logoutUser);

export default router;
